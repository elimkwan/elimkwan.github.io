---
layout: splash
permalink: /projects/matlab-ber
title: "Bit Error Rate Analysis"

date: 2016-03-23T11:48:41-04:00

header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: "https://www.dropbox.com/s/r912qboc14rr8tz/ber-sim.jpg?raw=1"
  actions:
    - label: "Code"
      url: "https://github.com/elimkwan/MATLAB-BERanalysis"
excerpt: "Simulate communication system"
---
<!-- Content -->
<p>Using MATLAB code to simulate QPSK communication system, and displaying BER graphs of other modulation schemes. For instance, the program compares the theoretical and simulation performance of QPSK system and the performance of QPSK and 16QAM in Rayleigh Fading.</p>
<img src="https://www.dropbox.com/s/r912qboc14rr8tz/ber-sim.jpg?raw=1">

<p><em>Example code of plotting Rayleigh Fading graph</em></p>
<figure class="highlight matlab"><table><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br><span class="line">7</span><br><span class="line">8</span><br><span class="line">9</span><br><span class="line">10</span><br><span class="line">11</span><br><span class="line">12</span><br><span class="line">13</span><br><span class="line">14</span><br><span class="line">15</span><br><span class="line">16</span><br><span class="line">17</span><br><span class="line">18</span><br><span class="line">19</span><br><span class="line">20</span><br><span class="line">21</span><br><span class="line">22</span><br><span class="line">23</span><br><span class="line">24</span><br><span class="line">25</span><br><span class="line">26</span><br><span class="line">27</span><br><span class="line">28</span><br><span class="line">29</span><br><span class="line">30</span><br><span class="line">31</span><br><span class="line">32</span><br><span class="line">33</span><br></pre></td><td class="code"><pre><span class="line"><span class="comment">%----------------------------Rayleigh Fading----------------------</span></span><br><span class="line"></span><br><span class="line"><span class="built_in">figure</span>(<span class="number">3</span>);</span><br><span class="line"></span><br><span class="line">EbNo_dB = <span class="number">0</span>:<span class="number">2</span>:<span class="number">150</span>;</span><br><span class="line"></span><br><span class="line">BER_QPSK = berawgn(EbNo_dB,<span class="string">'psk'</span>,<span class="number">4</span>,<span class="string">'nondiff'</span>);</span><br><span class="line">semilogy(EbNo_dB,BER_QPSK)</span><br><span class="line">grid on</span><br><span class="line"><span class="built_in">hold</span> on</span><br><span class="line"></span><br><span class="line">BER_16QAM = berawgn(EbNo_dB,<span class="string">'qam'</span>,<span class="number">16</span>);</span><br><span class="line">semilogy(EbNo_dB,BER_16QAM)</span><br><span class="line">grid on</span><br><span class="line"><span class="built_in">hold</span> on</span><br><span class="line"></span><br><span class="line">BER_QPSK_RAY = berfading(EbNo_dB,<span class="string">'psk'</span>,<span class="number">4</span>,<span class="number">1</span>);</span><br><span class="line">semilogy(EbNo_dB,BER_QPSK_RAY)</span><br><span class="line">grid on</span><br><span class="line"><span class="built_in">hold</span> on</span><br><span class="line"></span><br><span class="line">BER_16QAM_RAY = berfading(EbNo_dB,<span class="string">'qam'</span>,<span class="number">16</span>,<span class="number">1</span>);</span><br><span class="line">semilogy(EbNo_dB,BER_16QAM_RAY)</span><br><span class="line">grid on</span><br><span class="line"><span class="built_in">hold</span> on</span><br><span class="line"></span><br><span class="line">xlabel(<span class="string">'EbNo(dB)'</span>);</span><br><span class="line">ylabel(<span class="string">'Bit Error Rate'</span>);</span><br><span class="line">set(findall(gca, <span class="string">'Type'</span>, <span class="string">'Line'</span>),<span class="string">'LineWidth'</span>,<span class="number">1</span>);</span><br><span class="line"></span><br><span class="line"></span><br><span class="line">title(<span class="string">'Performance of QPSK and 16QAM in Rayleigh Fading'</span>);</span><br><span class="line"><span class="built_in">legend</span>(&#123;<span class="string">'QPSK'</span>,<span class="string">'16QAM'</span>,<span class="string">'QPSK in Rayleigh Fading'</span>,<span class="string">'16QAM in Rayleigh Fading'</span>&#125;)</span><br></pre></td></tr></table></figure>

<br>
<img src="https://www.dropbox.com/s/w6ha52xb00pie4z/ber-rayleigh.jpg?raw=1">

<h3>Key Skills developed:<h3>
<button>#BER Analysis</button>  <button>#MATLAB</button>  <button>#TeleCommunication</button></h3></h3>