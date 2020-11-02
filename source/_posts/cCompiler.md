---
title: C Decompiler
date: 2019-08-05 01:29:30
tags:
cover_index: "https://www.dropbox.com/s/1qfnms34t3kbdg0/thumb-cCompiler.jpg?raw=1"
---
It was one of my projects in first year. The program translates compiled files written in machine code and decompiles them into a ZX256 assembly representation. The project allowed me to gain a better understanding on fundamental programming concepts.

For instance, below is command for decompliing hello.out file into assembly code, and the output are printed out as follows.

{% codeblock lang:C%}

$./asmdump.exe tests/hello.out
        db "Hello world!\n"
main:   mov %a,0x04
        mov %b,0x01
        mov %c,0x00
        mov %d,0x0d
        syscall
        mov %a,0x01
        syscall

{% endcodeblock %}

<em><a href="https://github.com/elimkwan/C_Decompiler-Interpreter" target="_blank" rel="noopener">#GITHUB REPO
</a></em>

<br>
<br>
<h3>Key Skills developed:<h3>
<button>#C</button>  <button>#Programming</button>  <button>#Computer Architecture</button>