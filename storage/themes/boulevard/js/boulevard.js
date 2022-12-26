var Boulevard=function(){this.namespace="Boulevard",this.currentImage=0,this.timer};Boulevard.prototype={bindImages:function(){var e=this;requestAnimationFrame(function(){e.getImages().css("cursor","pointer").off(e.namespace).on("click."+e.namespace,function(t){if(t.preventDefault(),!$("body").hasClass("k-source-album")&&!$("body").hasClass("k-source-favorites"))return!0;var n=$("#album-intro").length?$(this).closest(".cell").index():$(this).closest(".cell").index()+1;n<e.currentImage?e.currentImage--:n>=e.currentImage&&e.currentImage++,e.laneScrollTo()}),$(window).trigger("resize")})},checkLane:function(){$("#lane .cell").length?$("#next,#prev").show():$("#next,#prev").hide()&&$("#lane").width("auto")},easeOut:function(e,t,n,i,a){var r=1.70158,o=0,s=i;if(0==t)return n;if(2==(t/=a/2))return n+i;if(o||(o=a*(.3*1.5)),s<Math.abs(i)){s=i;var r=o/4}else var r=o/(2*Math.PI)*Math.asin(i/s);return t<1?-.5*(s*Math.pow(2,10*(t-=1))*Math.sin((t*a-r)*(2*Math.PI)/o))+n:s*Math.pow(2,-10*(t-=1))*Math.sin((t*a-r)*(2*Math.PI)/o)*.5+i+n},getImages:function(){return $("#lane img:not(.__overlay__)")},getVideos:function(){return $("#lane .cell.video")},getCurrentImageInView:function(){var e=this;return $(window).scrollLeft()<=0?void(this.currentImage=0):void this.getImages().each(function(t){if($(this).closest(".cell").offset().left>$(window).scrollLeft())return e.currentImage=++t,!1})},getMediaQueryHeight:function(){var e=window,t="inner";"innerWidth"in window||(t="client",e=document.documentElement||document.body);var n,i=e[t+"Width"],a=e[t+"Height"];return n=a>=1e3?800:a>=900?700:a>=800?600:i<767?165:520},laneScrollTo:function(){var e=this.getImages().length;this.currentImage>=e?this.currentImage=e:this.currentImage<0&&(this.currentImage=0);var t=0===this.currentImage&&$("#album-intro").length?0:$("#lane .cell:eq("+this.currentImage+")").offset().left;$("html,body").stop().animate({scrollLeft:t-80},400,this.easeOut)},lazyHold:function(){var e=this;$K.responsiveImages(this.getImages(),function(){e.updateLaneWidth(),e.getCurrentImageInView(),requestAnimationFrame(function(){$("[data-lazy-hold]").attr("data-lazy-hold",null)})})},ready:function(){window.scrollTo(0,0),this.currentImage=0,this.lazyHold(),this.updateLaneProperties(),this.checkLane(),this.bindImages()},updateLaneProperties:function(){$("#lane").css({top:"none"===$("header").css("display")||"hidden"===$("header").css("visibility")?"0px":$("header").height()+"px",width:"99999px"})},updateLaneWidth:function(){var e=1,t=$("#album-intro:visible").length<=0?10:$("#album-intro").outerWidth(!0);this.getImages().length<=0&&this.getVideos().length<=0||(this.getImages().each(function(){e+=$(this).closest(".cell").outerWidth(!0)}),this.getVideos().each(function(){e+=$(this).outerWidth(!0)}),$("#lane").css("width",e+t+"px"),$("span.caption").each(function(){var e=$(this).closest("div").find("img").width(),t=$(this).width();t>e&&e>0&&$(this).width(e)}))},updateVimeo:function(){var e=this;$('iframe[src*="//player.vimeo.com"]').each(function(){var t=$(this).parents(".cell");t.find(".max-width-video-wrapper").css("max-width",""),t.width(Math.floor(e.getMediaQueryHeight()*t.data("aspect"))),t.attr("data-vimeo",!0)}),requestAnimationFrame(function(){e.updateLaneWidth()})},updateVideo:function(){var e=this;$(".cell.video").each(function(){var t=$(this);t.width(Math.floor(e.getMediaQueryHeight()*t.data("aspect")))}),requestAnimationFrame(function(){$K.resizeVideos(),e.updateLaneWidth()})}},Boulevard=new Boulevard,$(function(){var e=window.Boulevard;$("nav ul").tinyNav({header:"Navigation"}),$("#site-title img").length&&$("#site-title img").on("load",function(){$("#lane").css("top",$("header").height()+"px")}),$(window).on("resize",function(){clearTimeout(e.timer),e.timer=setTimeout(function(){clearTimeout(e.timer),e.lazyHold(),e.updateVimeo(),e.updateVideo()},250)}).on("k-infinite-loaded",function(){e.lazyHold()}),$(document).off(e.namespace).on("k-pjax-end."+e.namespace,e.checkLane).on("k-image-loading."+e.namespace,function(){e.updateLaneWidth()}).on("pjax:complete."+e.namespace,function(){$("#album-intro").length>0&&$("#site-title h2").html("/&nbsp;"+$("#album-intro h1").text().trim()),e.ready(),$K.ready()}).on("click."+e.namespace,"#next,#prev",function(t){t.preventDefault(),e.currentImage+="next"===$(this).attr("id")?1:-1,e.laneScrollTo()}),$.support.pjax&&$(document).on("click."+e.namespace,"#lane a",function(){if(!$("body").hasClass("k-source-album")&&$("#lane").length){var e=$(this);return $(this).closest("#lane").length>0?$("#site-title h2").html("/&nbsp;"+$(this).text().trim()):$("#site-title h2").html(""),$.pjax({url:e.attr("href"),container:"#lane"}),!1}}),$("#lane").on("mousewheel",function(t){if($(t.target).closest("#album-intro").length)return!0;t.preventDefault();var n=Math.abs(t.deltaX)>Math.abs(t.deltaY)?t.deltaX:t.deltaY*-1;$(document).scrollLeft($(document).scrollLeft()+t.deltaFactor*n),e.getImages().each(function(t,n){if($(this).closest(".cell").offset().left>$(window).scrollLeft())return e.currentImage=t,!1})}),$("#lane iframe").attr("scrolling","no"),window.addEventListener("orientationchange",function(){return window.setTimeout(function(){$("#lane").css("top","none"===$("header").css("display")||"hidden"===$("header").css("visibility")?"0px":$("header").height()+"px")},500),!1}),e.ready()});