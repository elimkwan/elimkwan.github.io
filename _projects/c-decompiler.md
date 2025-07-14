---
layout: splash
permalink: /projects/c-decompiler
title: "Simple C Decompiler from Scratch"

date: 2016-03-23T11:48:41-04:00

header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/decompiler.jpg
  actions:
    - label: "Code"
      url: https://github.com/elimkwan/C_Decompiler-Interpreter
excerpt: "Low level programming - one level above ones and zeros"
---

<!-- Content -->
<p>It was one of my projects in first year. The program translates compiled files written in machine code and decompiles them into a ZX256 assembly representation. The project allowed me to gain a better understanding on fundamental programming concepts.</p>
<p>For instance, below is command for decompliing hello.out file into assembly code, and the output are printed out as follows.</p>
<figure class="highlight c"><table><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br><span class="line">7</span><br><span class="line">8</span><br><span class="line">9</span><br><span class="line">10</span><br><span class="line">11</span><br></pre></td><td class="code"><pre><span class="line"></span><br><span class="line">$./asmdump.exe tests/hello.out</span><br><span class="line">        db <span class="string">"Hello world!\n"</span></span><br><span class="line">main:   mov %a,<span class="number">0x04</span></span><br><span class="line">        mov %b,<span class="number">0x01</span></span><br><span class="line">        mov %c,<span class="number">0x00</span></span><br><span class="line">        mov %d,<span class="number">0x0d</span></span><br><span class="line">        syscall</span><br><span class="line">        mov %a,<span class="number">0x01</span></span><br><span class="line">        syscall</span><br><span class="line"></span><br></pre></td></tr></table></figure>

<br>
<br>
<h3>Key Skills developed:<h3>
<button>#C</button>  <button>#Programming</button>  <button>#Computer Architecture</button></h3></h3>