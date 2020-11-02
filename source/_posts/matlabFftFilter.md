---
title: Separate noise from audio with linear filter
date: 2019-08-05 01:31:44
tags:
cover_index: "https://www.dropbox.com/s/6uwy4ct6ce2h362/thumb-fft.jpg?raw=1"
hidden: 
---

This project shows how we can apply spectra analysis technicals to create a digital filter that filter away the unwanted frequency in audio.


<br>
Input Audio
<br>
<iframe 
  frameborder="0" 
  width="400"     
  height="50"
  src="https://drive.google.com/file/d/1CZGguEngjqUYdCFbc_o3nXHMx_O8c5ks/preview">    
</iframe>

<br>
Output Audio
<br>
<iframe 
  frameborder="0" 
  width="400"     
  height="50"
  src="https://drive.google.com/file/d/1cJlmOxJzSeSXmcnTQ6WG1yZFz0o2Oy_M/preview">    
</iframe>
<br>
<br>
<br>
<br>

By plotting the frequency spectrum of the input signal, we can identify that the noise lies at 835Hz, 1530Hz. 
<img src="https://www.dropbox.com/s/wath67u2gqixnfv/fft-input-spec.jpg?raw=1" width="1080" height="500">


Since sampling frequency is 44100Hz and normalised frequency is calculated by 2* pi * frequency/ sampling frequency, the noise component lie at angular frquency 0.11(835Hz), 0.22(1530Hz). Poles and zeros should be placed at amplitude*e^(angular frequency) on the Pole Zero diagram as shown below. Amplitude of Zeros should be larger than pole in order to attenuate the signal.
<img src="https://www.dropbox.com/s/i5rq6xxbehbvi8y/fft-poles.jpg?raw=1" width="600" height="500">


The filter will then behave as follows. Normalised frquency is calculated by frequency/ sampling frequency. Therefore, we saw a dip in amplitude at normalised frequency 0.01(835Hz) and 0.03(1530Hz) in the filter amplitude response graph.
<img src="https://www.dropbox.com/s/hse25nsddx068e1/fft-filter-response.jpg?raw=1" width="1080" height="400">

Upon applying the filter to the input signal, we can compare the difference between the input and output frequency spectrum. Noise component (835Hz, 1530Hz) no longer exist in the frequency spectrum of the output signal!
<img src="https://www.dropbox.com/s/x031nbs6cwjvmk3/fft-output-spectrum.jpg?raw=1" width="1080" height="500">

The detailed code is as follows:
{% codeblock lang:matlab %}
[xn fs]=audioread('input.wav');
                   
T = 1/fs;             % Sampling period       
L = length(xn);       % Length of signal
t = (0:L-1)*T;        % Time vector

Li = L 
t1 = t(1:Li);
xn1 = xn(1:Li);

Y1 = fft(xn1);
P2a = abs(Y1/Li);
P1a = P2a(1:Li/2+1);
P1a(2:end-1) = 2*P1a(2:end-1);
f1 = fs*(0:(Li/2))/Li;

%in frequency domain
figure(1)
plot(f1,P1a) 
title('Sample 3a Spectrum')
xlabel('f (Hz)')
ylabel('|P1(f)|')
xlim([0 5000])


% 147 220 294 349.7 440 835 1530
%Sample 3a remove noise at 835Hz, 1530Hz

f1 = 835
f2 = 1530
fs = 44100


zer = 1*exp(j*2*pi*[-f1/fs f1/fs -f2/fs f2/fs]'); 
pol = 0.9*exp(j*2*pi*[-f1/fs f1/fs -f2/fs f2/fs]');

zplane(zer,pol)
[b1,a1] = zp2tf(zer,pol,1);
fvtool(b1,a1)

%apply filter
x1f = filter(b1, a1, xn)


%filtered data in frequency
%L1 = round(0.2/T);
Li = L 
t1 = t(1:Li);
yn1 = x1f(1:Li);

Y1 = fft(yn1);
P2a = abs(Y1/Li);
P1a = P2a(1:Li/2+1);
P1a(2:end-1) = 2*P1a(2:end-1);
f1 = fs*(0:(Li/2))/Li;

%filtered data in frequency domain
figure(2)
plot(f1,P1a) 
title('Filtered Sample 3a Spectrum')
xlabel('f (Hz)')
ylabel('|P1(f)|')
xlim([0 5000])


%playing filtered sample 3a
p = audioplayer(x1f, fs);
play(p);
audiowrite('filtered_output.wav',x1f,fs)
{% endcodeblock %}

<br>
<br>
<br>
<h3>Key Skills developed:<h3>
<button>#Digital Filter</button>  <button>#MATLAB</button>  <button>#FFT</button>