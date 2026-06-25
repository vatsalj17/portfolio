import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const fileSystem = {
  'projects': { 
    type: 'dir', 
    contents: {
      'vdbg.txt': 'vdbg: Custom Linux Debugger in C\n--------------------------------\nBuilt from scratch using ptrace and libdwfl for DWARF parsing.\nFeatures: Breakpoints, instruction stepping, DWARF line resolution, and ELF symbol lookup.',
      'c-generics.txt': 'c-generics: STL-like Container Library in C\n-------------------------------------------\nDependency-free library of generic data structures (Vector, Hash Table, Set) built using type erasure with void pointers.',
      'vzip.txt': 'VZIP: File Compression Tool in C\n--------------------------------\nImplements static Huffman coding from scratch. Analyzes byte frequencies and compresses data using custom bit-level I/O.',
      'arch8.txt': 'arch8: 8-bit CPU Design in Logisim\n----------------------------------\nA fully custom, hand-crafted 8-bit CPU designed from first principles. Features a microcoded control unit and a custom ISA.',
      'heap-tracer.txt': 'Heap Tracer: Memory Allocation Tracker\n--------------------------------------\nRuntime memory tracker using LD_PRELOAD to intercept malloc/free calls and automatically detect memory leaks.',
      'c-chatroom.txt': 'C Chatroom: Multi-client TCP Server\n-----------------------------------\nA real-time chat application utilizing TCP sockets and POSIX threads. Supports public broadcasting and private messaging.',
      'terminal-editor.txt': 'Terminal Text Editor in C\n-------------------------\nA lightweight text editor built from scratch using raw terminal mode, VT100 escape sequences, and gap buffer management.',
      'vsh.txt': 'vsh: Custom Unix Shell\n----------------------\nSupports built-in commands, external execution (fork/exec), I/O redirection, pipes, and background job handling.',
      'riceverse.txt': 'riceverse: Custom Linux Dotfiles\n--------------------------------\nMy heavily automated Arch Linux workstation setup featuring Hyprland, GNU Stow, Tmux, and Neovim, styled in Catppuccin.'
    }
  },
  'skills.txt': { type: 'file', content: 'Low-Level: C, C++, x86_64/AMD64 Assembly, OS Internals, Computer Architecture\nTools: GDB, GNU Make, Valgrind, ptrace, elfutils\nEnvironment: Arch Linux, Hyprland, Neovim, Tmux, Kitty\nSoftware Eng: Python, Java, PostgreSQL, MongoDB, Network Programming' },
  'contact.txt': { type: 'file', content: 'GitHub: github.com/vatsalj17\nLinkedIn: linkedin.com/in/vatsalj17\nEmail: vatsaljaiswal17@gmail.com' },
  'about.txt': { type: 'file', content: 'Computer Science student with a deep interest in Systems Programming and Low-Level Engineering.\nMy focus is on understanding how software interacts with hardware.\nI enjoy working close to the metal, writing C, analyzing x64 disassembly, and exploring kernel mechanics.' }
};

const neofetchOutput = `
       /\\         vatsalj17@portfolio
      /  \\        -------------------
     /\\   \\       OS: Arch Linux x86_64
    /      \\      WM: Hyprland
   /   ,,   \\     Terminal: custom-vsh
  /   |  |   \\    Editor: Neovim
 /_-''    ''-_\\   Focus: Low-Level Systems
`;

const bootSequence = [
  "[    0.000000] Linux version 6.8.0-zen (vatsalj17@portfolio) (gcc (GCC) 13.2.1) #1 ZEN SMP PREEMPT",
  "[    0.012341] Command line: initrd=\\initramfs-linux-zen.img root=/dev/nvme0n1 rw",
  "[    0.045012] x86/cpu: Booting SMP configuration...",
  "[    0.089123] Memory: 32768K/32768K available",
  "[    0.102341] Mount-cache hash table entries: 65536 (order: 7, 524288 bytes)",
  "[    0.150000] SMBIOS 3.3.0 present.",
  "[    0.200111] vdbg: initializing ptrace hooks...",
  "[    0.301222] systemd[1]: Reached target Graphical Interface.",
  "Starting vsh (V Shell) v1.0.0..."
];

const TerminalOverlay = ({ onClose }) => {
  const [history, setHistory] = useState([]);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [input, setInput] = useState('');
  const [cwd, setCwd] = useState('/');
  const [isBooting, setIsBooting] = useState(true);
  const [bootText, setBootText] = useState([]);
  const [matrixMode, setMatrixMode] = useState(false);
  
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    let timeout;
    const runBoot = async () => {
      for (let i = 0; i < bootSequence.length; i++) {
        await new Promise(r => { timeout = setTimeout(r, Math.random() * 100 + 30) });
        setBootText(prev => [...prev, bootSequence[i]]);
      }
      await new Promise(r => { timeout = setTimeout(r, 300) });
      setIsBooting(false);
      setHistory([{ type: 'output', text: neofetchOutput }, { type: 'output', text: 'Type `help` for available commands.' }]);
    };
    runBoot();
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!isBooting && !matrixMode) {
      inputRef.current?.focus();
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, isBooting, matrixMode]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0 && historyIndex < cmdHistory.length - 1) {
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex);
        setInput(cmdHistory[cmdHistory.length - 1 - nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(cmdHistory[cmdHistory.length - 1 - nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const args = input.split(' ');
      const lastWord = args[args.length - 1];
      const commands = ['help', 'neofetch', 'ls', 'cat', 'cd', 'pwd', 'clear', 'exit', 'sudo', 'matrix', 'whoami'];
      
      let options = [];
      if (args.length === 1) {
        options = commands.filter(c => c.startsWith(lastWord));
      } else if (args[0] === 'cat' || args[0] === 'cd' || args[0] === 'ls') {
        const dir = cwd === '/' ? fileSystem : fileSystem[cwd.replace('/', '')]?.contents;
        if (dir) {
          options = Object.keys(dir).filter(f => f.startsWith(lastWord));
        }
      }

      if (options.length === 1) {
        args[args.length - 1] = options[0];
        setInput(args.join(' '));
      }
    }
  };

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) {
      setHistory(prev => [...prev, { type: 'input', text: `vatsalj17@portfolio:${cwd}$ ` }]);
      return;
    }

    setCmdHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    const args = trimmed.split(' ').filter(Boolean);
    const command = args[0].toLowerCase();
    let output = '';

    const currentDirObj = cwd === '/' ? fileSystem : fileSystem[cwd.replace('/', '')]?.contents;

    switch (command) {
      case 'help':
        output = `Available commands:\n  help       Show this message\n  neofetch   System info\n  ls         List directory contents\n  cd         Change directory\n  cat        Read file\n  pwd        Print working directory\n  clear      Clear terminal\n  whoami     Print user info\n  matrix     Enter the matrix\n  exit       Close terminal`;
        break;
      case 'neofetch':
        output = neofetchOutput;
        break;
      case 'whoami':
        output = 'root';
        break;
      case 'pwd':
        output = cwd;
        break;
      case 'ls':
        let targetDirObj = currentDirObj;
        if (args[1]) {
          const target = args[1].replace(/\/$/, '');
          let resolvedObj;
          if (cwd === '/') {
            resolvedObj = fileSystem[target];
          } else if (target === '..') {
             resolvedObj = fileSystem;
          } else {
             resolvedObj = currentDirObj[target];
          }

          if (!resolvedObj) {
            output = `ls: cannot access '${args[1]}': No such file or directory`;
            break;
          } else if (resolvedObj.type === 'file' || typeof resolvedObj === 'string') {
            output = args[1];
            break;
          } else if (resolvedObj.type === 'dir') {
            targetDirObj = resolvedObj.contents;
          } else {
            targetDirObj = resolvedObj;
          }
        }
        
        if (targetDirObj) {
          output = Object.keys(targetDirObj).map(key => {
            const item = targetDirObj[key];
            return (typeof item === 'string' || item.type === 'file') ? key : `${key}/`;
          }).join('  ');
        } else {
          output = '';
        }
        break;
      case 'cd':
        if (!args[1] || args[1] === '~' || args[1] === '/') {
          setCwd('/');
        } else if (args[1] === '..') {
          setCwd('/');
        } else {
          const target = args[1].replace('/', '');
          if (cwd === '/' && fileSystem[target] && fileSystem[target].type === 'dir') {
            setCwd(`/${target}`);
          } else {
            output = `vsh: cd: ${args[1]}: No such directory`;
          }
        }
        break;
      case 'cat':
        if (!args[1]) {
          output = 'cat: missing operand';
        } else {
          let target = args[1];
          let file;
          
          if (target.includes('/')) {
            const [dirName, fileName] = target.split('/');
            if (cwd === '/' && fileSystem[dirName] && fileSystem[dirName].type === 'dir') {
              file = fileSystem[dirName].contents[fileName];
            }
          } else {
            if (cwd === '/') {
               file = fileSystem[target];
            } else {
               file = currentDirObj[target];
            }
          }
          
          if (!file) {
            output = `cat: ${target}: No such file or directory`;
          } else if (file.type === 'dir') {
            output = `cat: ${target}: Is a directory`;
          } else {
            output = file.content || file;
          }
        }
        break;
      case 'sudo':
        if (args[1] === 'rm' && args[2] === '-rf' && args[3] === '/') {
          output = "Nice try, script kiddie. This is a read-only portfolio.";
        } else {
          output = `vatsalj17 is not in the sudoers file. This incident will be reported.`;
        }
        break;
      case 'matrix':
        setMatrixMode(true);
        return;
      case 'clear':
        setHistory([]);
        return;
      case 'exit':
        onClose();
        return;
      default:
        output = `vsh: command not found: ${command}`;
    }

    setHistory(prev => [
      ...prev,
      { type: 'input', text: `vatsalj17@portfolio:${cwd}$ ${trimmed}` },
      { type: 'output', text: output }
    ]);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-[#11111b]/80 backdrop-blur-sm z-50 flex justify-center items-center p-4" onClick={onClose}>
        
        {matrixMode && <MatrixEffect onClose={() => setMatrixMode(false)} />}

        {!matrixMode && (
          <motion.div 
            drag
            dragMomentum={false}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-[700px] h-[450px] bg-[#1e1e2e]/95 backdrop-blur-md border border-[#313244] rounded-lg shadow-2xl flex flex-col font-mono text-sm overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#181825] border-b border-[#313244] px-4 py-2 flex items-center justify-between cursor-grab active:cursor-grabbing">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#f38ba8] cursor-pointer hover:opacity-80" onClick={onClose} />
                <div className="w-3 h-3 rounded-full bg-[#f9e2af]" />
                <div className="w-3 h-3 rounded-full bg-[#a6e3a1]" />
              </div>
              <span className="text-xs text-[#a6adc8] font-bold">vatsalj17@portfolio:~</span>
              <div className="w-12"></div>
            </div>

            <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-1 text-[#cdd6f4] relative" onClick={() => inputRef.current?.focus()}>
              
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] opacity-20 z-10" />

              {isBooting ? (
                <div className="text-[#a6adc8] whitespace-pre-wrap flex flex-col gap-1">
                  {bootText.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                  <div className="animate-pulse">_</div>
                </div>
              ) : (
                <>
                  {history.map((line, i) => (
                    <div key={i} className={line.type === 'output' ? 'text-[#a6adc8] whitespace-pre-wrap mb-2' : 'text-[#a6e3a1]'}>
                      {line.text}
                    </div>
                  ))}
                  <div className="flex text-[#cdd6f4]">
                    <span className="mr-2 text-[#a6e3a1] shrink-0">vatsalj17@portfolio:{cwd}$</span>
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleCommand(input);
                        setInput('');
                      }}
                      className="flex-1"
                    >
                      <input 
                        ref={inputRef}
                        type="text" 
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full bg-transparent outline-none border-none text-[#cdd6f4] caret-[#cba6f7]"
                        autoComplete="off"
                        spellCheck="false"
                        autoFocus
                      />
                    </form>
                  </div>
                  <div ref={bottomRef} className="pb-4" />
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
};

const MatrixEffect = ({ onClose }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%""\'#&_(),.;:?!\\|{}<>[]^~'.split('');
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array.from({ length: columns }).map(() => 1);

    const draw = () => {
      ctx.fillStyle = 'rgba(17, 17, 27, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#a6e3a1';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#11111b] flex items-center justify-center cursor-pointer" 
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <canvas ref={canvasRef} className="block" />
      <div className="absolute top-4 right-4 text-[#a6e3a1] font-mono bg-black/50 p-2 rounded border border-[#a6e3a1]/30">
        Press ESC or click anywhere to return
      </div>
    </div>
  );
};

export default TerminalOverlay;
