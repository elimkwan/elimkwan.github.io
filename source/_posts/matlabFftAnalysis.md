---
title: Determine musical notes with spectral analysis techniques
date: 2019-08-05 01:31:35
tags:
cover_index: "https://www.dropbox.com/s/liwnu9ssx9ikl1a/thumb-matlabFftAnalysis.jpg?raw=1"
---

Spectral analysis techniques could be used to determine the musical notes, even when they are overlapping. The MATLAB code below would generate a graphs of the audio in time and frequency domain. By observing the first three lowest frequencies peaks in the frequency domain, the notes in the chord could be found. The trick part is to ignore the peaks formed by the summation of two second harmonics.

{% codeblock lang:matlab %}
clear all;

[xn fs]=audioread('sample.wav');
                   
T = 1/fs;             % Sampling period       
L = length(xn);       % Length of signal
t = (0:L-1)*T;        % Time vector

%in time domain all
figure(1);
plot(t,xn);
title('Signal in time');
xlabel('t(seconds)');
ylabel('X(t)');

%Chord 1
%L1 = round(0.2/T);
Li = round(L/5)-1 %9280
t1 = t(1:Li);
xn1 = xn(1:Li);

Y1 = fft(xn1);
P2a = abs(Y1/Li);
P1a = P2a(1:Li/2+1);
P1a(2:end-1) = 2*P1a(2:end-1);
f1 = fs*(0:(Li/2))/Li;

%Chord1 in time domain
figure(2)
plot(t1,xn1)
title('Chord 1 in time')
xlabel('t(seconds)')
ylabel('X(t)')

%Chord 1 in frequency domain
figure(3)
plot(f1,P1a) 
title('Chord 1 Spectrum')
xlabel('f (Hz)')
ylabel('|P1(f)|')
xlim([0 5000])

%Chord 1
%[165 205 245]
%[164.81 207.65 246.84]
{% endcodeblock %}

<br>
<br>
<br>
<h3>Key Skills developed:<h3>
<button>#Spectral Analysis</button>  <button>#MATLAB</button>  <button>#FFT</button>