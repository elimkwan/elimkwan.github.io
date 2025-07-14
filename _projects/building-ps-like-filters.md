---
layout: splash
permalink: /projects/building-ps-like-filters
title: "Building a PS-like Filter"

date: 2016-03-23T11:48:41-04:00

header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/polar-bear-and-me.jpg
  actions:
    - label: "Code"
      url: "https://github.com/elimkwan/Python-Image-Processing-Operators"
excerpt: "How do photo filters work?"
---

<!-- Content -->
<p>This post documented how we recreate Photoshop-like filter from scratch with Python. Including fundamental concepts from image processing: Histogram Equalisation, Laplcian Pyramid Blending, Possion Blending etc. </p>
<h1 style="color:#7ecaf6;"> Histogram Equalisation with numpy.bincount() </h1>

<br>
<div style="width:800px; margin:0 auto;">
<img src="https://www.dropbox.com/s/9d7n4fodwyub4di/python-imgenh-task1.png?raw=1" width="800">
</div>
<br>

<p>
Histogram equalisation helps enhance the image to be more vivid. It improves the global contrast of the images by allowing area with low local contrast to gain a higher contrast. Without using .equalize_hist() functions, it can be implemented with:
<li> Step 1: Compute an image histogram with numpy.bincount()</li>
<li> Step 2: Compute a normalized cumulative histogram</li>
<li> Step 3: Use the cumulative histogram to map pixels to the new values as a lookup table</li>
</p>
<br>
<figure class="highlight plain"><figcaption><span>lang: python</span></figcaption><table><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line">#tbc calculating histogram</span><br></pre></td></tr></table></figure>

<p>
Comparing the resultant images above, it is noticeable that different processing techniques have their own features. Firstly, “Processing each channel separately” will in general correct the overall colour of the images. Secondly, “Process value channel in HSV colour space” will results in a slightly darker foreground compare to “Grey-scaled + colour ratio”. The front building and the wall with the graffiti is bright for the “Grey-scaled + colour ratio” image than that of “Process value channel in HSV colour space” image. 
</p>
<br>
<br>
<br>
<br>




<h1 style="color:#7ecaf6;"> Alpha Blending </h1>
<br>
<div style="width:800px; margin:0 auto;">
<img src="https://www.dropbox.com/s/94uiz2z7uopyrcm/python-imgenh-task2.png?raw=1" width="800">
</div>
<br>

<p>
The objective is to combine two images into one so that the content is “stitched” together in a possibly seamless manner. The alpha mask (for the left-hand side image) is:
</p>
<div style="width:800px; margin:0 auto;">
<img src="https://www.dropbox.com/s/z5hidjfiwvvlsyz/python-imgenh-task2-2.png?raw=1" width="800">
</div>
<p>
which essential states that within the window, we would like the value of the mask gradually decrease from 1 to 0. For the right-hand side image, the mask would just be (1 – α1).
</p>
<figure class="highlight plain"><figcaption><span>lang: python</span></figcaption><table><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line">#tbc alpha mask</span><br></pre></td></tr></table></figure>



<h1 style="color:#7ecaf6;"> Pyramid Blending </h1>
<p>
<br>
<div style="width:1200px; margin:0 auto;">
<img src="https://www.dropbox.com/s/5342hddnpxm9js5/python-imgenh-task3-2.png?raw=1" width="1200">
</div>
<br>
Although alpha blending is simple, designing an ideal alpha blending mask for any kind of image is difficult. The transition region in the blending mask should be relatively large when blending smooth regions to avoid visible seams. But when blending small structures, you want to use a small transition region to avoid ghosting. For a robust method that can handle both smooth regions and a high-frequency
structure, Laplacian pyramid is used.  Both images are decomposed into Laplacian pyramids and the levels from both pyramids are blended one-by-one, using a different alpha mask. As lower frequencies have a larger spatial extend, the transition for those frequencies should be smoother. Higher frequencies have a smaller spatial extend and they need a sharper transition. Above shows how a cat images is being decomposed into different levels of Laplacian pyramids. And below are the code for decomposing images into different levels, following with the function that expands them. 
</p>
<figure class="highlight plain"><figcaption><span>lang: python</span></figcaption><table><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br></pre></td><td class="code"><pre><span class="line">#tbc gausspyr_reduce </span><br><span class="line">#tbc gausspyr_expand</span><br></pre></td></tr></table></figure>

<p>
The difference between alpha blended image and pyramid blending images may not be apparent at first glance, but we can see that alpha blending has a gradual transition at all time across the boundary. While for pyramid blending, the background has a more gradual transition, but the objects part has a sharper transition. And this allow us to retain the details of the original object as much as possible, while having a smooth blending for the background. The window size was intentionally set to quite narrow to produce a more distinguish blending results. 
</p>
<br>
<div style="width:800px; margin:0 auto;">
<img src="https://www.dropbox.com/s/7ydgyzxeovj4s3v/python-imgenh-task3-3.png?raw=1" width="800">
</div>
<br>
<br>
<br>
<br>
<br>





<h1 style="color:#7ecaf6;"> Gradient Domain Image Enhancement </h1>
<div style="width:800px; margin:0 auto;">
<img src="https://www.dropbox.com/s/trfup5u6oxkpdad/python-imgenh-task5.png?raw=1" width="800">
</div>
<p>
The general motivation behind the gradient-based methods is that the human visual system is more sensitive to pixel differences (gradients) than absolute pixel values. Therefore, operations performed on image gradients should focus on visually important information and potentially produce more plausible results. Thus, we would like to perform image enhancement in the gradient domain and reconstruct the image from the modified gradient field.
</p>

<li>Step 1: Extract gradient field from input images.</li>
<figure class="highlight plain"><figcaption><span>lang: python</span></figcaption><table><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line">#tbc </span><br></pre></td></tr></table></figure>

<li>Step 2: Modifying the gradient field</li>
<br>
<div style="width:400px; margin:0 auto;">
<img src="https://www.dropbox.com/s/dsggzr2gp9ev2nk/python-imgenh-task5-2.png?raw=1" width="400">
</div>
<br>
<p> The gradient field is modified based on the function shown above</p>
<figure class="highlight plain"><figcaption><span>lang: python</span></figcaption><table><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line">#tbc </span><br></pre></td></tr></table></figure>


<li>Step 3: Reconstruct image from gradient field</li>
<figure class="highlight plain"><figcaption><span>lang: python</span></figcaption><table><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line">#tbc </span><br></pre></td></tr></table></figure>
<br>
<br>
<br>
<br>








<h1 style="color:#7ecaf6;"> Gradient domain Copy & Paste - Possion Blending </h1>
<div style="width:1200px; margin:0 auto;">
<img src="https://www.dropbox.com/s/wbio13feqkumy2o/python-imgenh-task6.png?raw=1" width="1200">
</div>
<br>
The gradient domain copy & paste operations (seamless cloning) from the paper by Pérez et al "Poisson Image Editing" is being implemented. A similar method is also used for the healing brush tool in Adobe Photoshop. The basic idea behind this method is to copy the portion of the gradient field from the source image to the target image and then solve for the pasted pixels. However, to ensure that the pasted region seamlessly merges into the target, the values of the pixels that belong to the edge of the pasted region need to be (soft-)constrained so that their values are close to the pixel values in the target image.
<figure class="highlight plain"><figcaption><span>lang: python</span></figcaption><table><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line">#tbc </span><br></pre></td></tr></table></figure>



<h3>Key Skills developed:<h3>
<button>#Python</button>  <button>#Numpy</button>  <button>#Computer Vision</button> </h3></h3>

<!-- Tags -->
<div class="tags">
    
</div>