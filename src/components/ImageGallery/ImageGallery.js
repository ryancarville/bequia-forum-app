import React, { Component } from "react";
import PhotoSwipe from "photoswipe";

import "./ImageGallery.css";
import "../../../node_modules/photoswipe/dist/default-skin/default-skin.css";
import "../../../node_modules/photoswipe/dist/photoswipe.css";
import PhotoSwipeUI_Default from "../../../node_modules/photoswipe/dist/photoswipe-ui-default";
export default class ImageGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: 1,
      imageCount: 0,
      images: this.props.images,
      captions: this.props.captions,
      openGallery: false,
      dataLoaded: false
    };
  }

  makeGallery = () => {
    const { images, captions } = this.state;
    var pswpElement = document.getElementById("pswp");
    // build items array
    var items = [];
    images.map((img, i) => {
      console.log(img);
      const tmpImg = new Image();
      tmpImg.src = img[i + 1];
      var x;
      var y;

      if (tmpImg.width > tmpImg.height) {
        x = 750;
        y = 500;
      } else {
        x = 500;
        y = 750;
      }
      var caption = captions.filter(cap => cap.id === img.key);
      caption.length > 0 ? (caption = caption[0].caption) : (caption = null);
      items.push({
        src: img[i + 1],
        w: x,
        h: y,
        title: caption // used by Default PhotoSwipe UI
      });
      return true;
    });
    // define options (if needed)
    var options = {
      index: 0 // start at first slide
    };
    if (items.length === images.length) {
      console.log(items);
      console.log(images);
      // Initializes and opens PhotoSwipe
      var gallery = new PhotoSwipe(
        pswpElement,
        PhotoSwipeUI_Default,
        items,
        options
      );
      gallery.init();
    }
  };
  handleOpenGallery = () => {
    console.log("ran");
    this.setState({
      openGallery: !this.state.openGallery
    });
  };
  makeThumbnails = () => {
    const { images } = this.state;
    console.log(images);
    return images.map((img, i) => {
      return (
        <figure
          itemProp="associatedMedia"
          itemScope
          itemType="http://schema.org/ImageObject"
        >
          <img
            src={img[i + 1]}
            itemProp="thumbnail"
            alt="test"
            onClick={() => this.handleOpenGallery()}
          />
        </figure>
      );
    });
  };
  componentDidMount() {
    this.setState({
      dataLoaded: true
    });
  }

  render() {
    const { dataLoaded, openGallery } = this.state;
    if (openGallery) {
      setTimeout(() => {
        this.makeGallery();
      }, 500);
    }
    return (
      <>
        {!dataLoaded ? null : (
          <div
            itemScope
            itemType="http://schema.org/ImageGallery"
            className="thumbnail-wrapper"
          >
            {this.makeThumbnails()}
          </div>
        )}
        {!openGallery ? null : (
          <div
            className="pswp"
            id="pswp"
            tabIndex="-1"
            role="dialog"
            aria-hidden="true"
          >
            <div className="pswp__bg"></div>
            <div className="pswp__scroll-wrap">
              <div
                className="pswp__container"
                onClick={() => this.handleOpenGallery()}
              >
                <div className="pswp__item"></div>
                <div className="pswp__item"></div>
                <div className="pswp__item"></div>
              </div>

              <div className="pswp__ui pswp__ui--hidden">
                <div className="pswp__top-bar">
                  <div className="pswp__counter"></div>

                  <button
                    className="pswp__button pswp__button--close"
                    title="Close (Esc)"
                    onClick={() => this.handleOpenGallery()}
                  ></button>

                  <button
                    className="pswp__button pswp__button--share"
                    title="Share"
                  ></button>

                  <button
                    className="pswp__button pswp__button--fs"
                    title="Toggle fullscreen"
                  ></button>

                  <button
                    className="pswp__button pswp__button--zoom"
                    title="Zoom in/out"
                  ></button>

                  <div className="pswp__preloader">
                    <div className="pswp__preloader__icn">
                      <div className="pswp__preloader__cut">
                        <div className="pswp__preloader__donut"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                  <div className="pswp__share-tooltip"></div>
                </div>

                <button
                  className="pswp__button pswp__button--arrow--left"
                  title="Previous (arrow left)"
                ></button>

                <button
                  className="pswp__button pswp__button--arrow--right"
                  title="Next (arrow right)"
                ></button>

                <div className="pswp__caption">
                  <div className="pswp__caption__center"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
