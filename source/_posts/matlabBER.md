---
title: Bit Error Rate Analysis
date: 2019-08-05 01:31:20
tags: 
cover_index: "https://www.dropbox.com/s/cw17uqc7oy4q5wa/thumb-ber.jpg?raw=1"
---

Using MATLAB code to simulate QPSK communication system, and displaying BER graphs of other modulation schemes. For instance, the program compares the theoretical and simulation performance of QPSK system and the performance of QPSK and 16QAM in Rayleigh Fading.

<img src="https://www.dropbox.com/s/r912qboc14rr8tz/ber-sim.jpg?raw=1">

<em>Example code of plotting Rayleigh Fading graph</em>

{% codeblock lang:matlab %}
%----------------------------Rayleigh Fading----------------------

figure(3);

EbNo_dB = 0:2:150;

BER_QPSK = berawgn(EbNo_dB,'psk',4,'nondiff');
semilogy(EbNo_dB,BER_QPSK)
grid on
hold on

BER_16QAM = berawgn(EbNo_dB,'qam',16);
semilogy(EbNo_dB,BER_16QAM)
grid on
hold on

BER_QPSK_RAY = berfading(EbNo_dB,'psk',4,1);
semilogy(EbNo_dB,BER_QPSK_RAY)
grid on
hold on

BER_16QAM_RAY = berfading(EbNo_dB,'qam',16,1);
semilogy(EbNo_dB,BER_16QAM_RAY)
grid on
hold on

xlabel('EbNo(dB)');
ylabel('Bit Error Rate');
set(findall(gca, 'Type', 'Line'),'LineWidth',1);


title('Performance of QPSK and 16QAM in Rayleigh Fading');
legend({'QPSK','16QAM','QPSK in Rayleigh Fading','16QAM in Rayleigh Fading'})
{% endcodeblock %}

<br>
<img src="https://www.dropbox.com/s/w6ha52xb00pie4z/ber-rayleigh.jpg?raw=1">

Full code can be found on <em><a href="https://github.com/elimkwan/MATLAB-BERanalysis" target="_blank" rel="noopener">GITHUB

<br>
<br>
<br>
<h3>Key Skills developed:<h3>
<button>#BER Analysis</button>  <button>#MATLAB</button>  <button>#TeleCommunication</button>