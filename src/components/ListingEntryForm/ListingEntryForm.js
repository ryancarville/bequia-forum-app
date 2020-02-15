import React, { Component } from "react";
import PhoneInput from "react-phone-number-input";
import ForumContext from "../../ForumContext";
import "./ListingEntryForm.css";

export default class ListingEntryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      forumSection: "",
      title: "",
      description: "",
      imageCount: 0,
      imagesToUpload: [],
      imageCaptions: [],
      price: "",
      location: "",
      contact_name: "",
      contact_email: "",
      contact_phone: "",
      date_posted: new Date().toISOString().slice(0, 10),
      edit: false
    };
  }
  static contextType = ForumContext;
  //handle reset form
  resetState = () => {
    this.setState({
      user_id: "",
      forumSection: "",
      title: "",
      description: "",
      imageCount: 0,
      imagesToUpload: [],
      imageCaptions: [],
      price: "",
      location: "",
      contact_name: "",
      contact_email: "",
      contact_phone: ""
    });
  };

  //handle forum section
  handleForumSection = e => {
    this.setState({
      forumSection: e.target.value
    });
  };
  //handle title
  handleTitle = e => {
    this.setState({
      title: e.target.value
    });
  };
  //handle description
  handleDescription = e => {
    console.log(e);
    this.setState({
      description: e.target.value
    });
  };
  //handle location
  handleLocation = e => {
    this.setState({
      location: e.target.value
    });
  };
  //handle price
  handlePrice = e => {
    this.setState({
      price: e.target.value
    });
  };
  //handle contact name
  handleContactName = e => {
    this.setState({
      contact_name: e.target.value
    });
  };
  //handle contact email
  handleContactEmail = e => {
    this.setState({
      contact_email: e.target.value
    });
  };
  //handle contact phone
  handleContactPhone = e => {
    this.setState({
      contact_phone: e
    });
  };
  //create market place sections menu
  makeSelectMenu = () => {
    return this.props.state.forumSections.map(mp => (
      <option key={mp.id} value={mp.id}>
        {mp.name}
      </option>
    ));
  };

  componentDidMount() {
    const { newListing } = this.props.state;
    if ("title" in newListing) {
      this.setState({
        user_id: newListing.user_id,
        forumSection: newListing.forumSection,
        title: newListing.title,
        description: newListing.description,
        price: newListing.price,
        location: newListing.location,
        contact_name: newListing.contact_name,
        contact_email: newListing.contact_email,
        contact_phone: newListing.contact_phone,
        imageCount: newListing.imageCount,
        imagesToUpload: newListing.imagesToUpload,
        imageCaptions: newListing.imageCaptions,
        edit: true
      });
      if (newListing.imagesToUpload.length > 0) {
        newListing.imagesToUpload.forEach(img => {
          if (newListing.imageCaptions.length > 0) {
            const caption = newListing.imageCaptions.filter(
              cap => cap.id === img.key
            );
            if (caption.length > 0) {
              img.caption = caption[0].caption;
            }
          }
          this.reloadImages(img);
        });
      }
    } else {
      this.setState({
        user_id: this.context.user.id
      });
    }
  }
  handleShowPreview = e => {
    e.preventDefault();
    const {
      user_id,
      forumSection,
      title,
      description,
      price,
      location,
      contact_name,
      contact_email,
      contact_phone,
      imagesToUpload,
      imageCaptions,
      date_posted
    } = this.state;
    const newListing = {
      user_id,
      forumSection,
      title,
      description,
      price,
      location,
      contact_name,
      contact_email,
      contact_phone,
      imagesToUpload,
      imageCaptions,
      date_posted
    };
    this.props.handleShowPreview(newListing);
  };

  showThumbnail = (key, file) => {
    var reader = new FileReader();
    reader.onload = () => {
      const img = document.getElementById(`user-listing-thumbnail-${key}`);
      img.src = reader.result;
      let image = {};
      image[`${key}`] = reader.result;
      image.key = key;
      this.setState({
        imagesToUpload: [...this.state.imagesToUpload, image]
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  //handle photo captions
  handleCaptionChange = (e, id) => {
    const { imageCaptions } = this.state;

    if (imageCaptions.length === 0) {
      this.setState({
        imageCaptions: [{ id: id, caption: e.target.value }]
      });
    } else {
      var allOtherCaps = imageCaptions.filter(cap => cap.id !== id);
      allOtherCaps.push({ id: id, caption: e.target.value });
      this.setState({
        imageCaptions: allOtherCaps
      });
    }
  };
  handleImageUpload = e => {
    const key = e.target.key;
    const node = document.getElementById(`single-image-${key}`);
    const file = document.getElementById(`user-listing-input-${key}`).files[0];
    file.key = key;

    const close = document.createElement("i");
    close.className = "fas fa-times closeImageUploader";
    close.onclick = () => this.handleCloseImageUpload(node.id, key);

    const newImg = document.createElement("img");
    newImg.id = `user-listing-thumbnail-${key}`;
    newImg.src = "#";
    newImg.className = "user-image";
    newImg.alt = `user-listing-thumbnail-${key}`;

    const captionInput = document.createElement("textarea");
    captionInput.className = "listing-photo-caption-input";
    captionInput.id = `user-listing-photo-caption-${key}`;
    captionInput.onchange = e => this.handleCaptionChange(e, key);
    captionInput.placeholder = "Enter Caption...";

    node.appendChild(close);
    node.appendChild(newImg);
    node.appendChild(captionInput);

    this.showThumbnail(key, file);
  };
  //remove image upload input from DOM
  handleCloseImageUpload = (el, key) => {
    const { imagesToUpload } = this.state;
    const node = document.getElementById(el);
    const currFiles = imagesToUpload.filter(img => img.key !== key);
    this.setState({
      imagesToUpload: currFiles,
      imageCount: currFiles.length
    });
    node.remove();
  };
  handleAddAnotherImage = () => {
    this.setState(
      {
        imageCount: this.state.imageCount + 1
      },
      () => {
        const key = this.state.imageCount;
        const spanA = document.createElement("span");
        spanA.className = "single-image-uploader";
        spanA.id = `single-image-${key}`;

        const input = document.createElement("input");
        input.key = key;
        input.name = `file`;
        input.id = `user-listing-input-${key}`;
        input.type = "file";
        input.className = "listing-image-input user-image-file-input";
        input.accept = "image/x-png,image/gif,image/jpeg";
        input.onchange = this.handleImageUpload;
        spanA.appendChild(input);

        const uploaderWrapper = document.getElementById("add-image-wrapper");
        uploaderWrapper.appendChild(spanA);
        const uploader = document.getElementById(`user-listing-input-${key}`);
        uploader.click();
      }
    );
  };

  reloadImages = img => {
    const key = img.key;
    const spanA = document.createElement("span");
    spanA.className = "single-image-uploader";
    spanA.id = `single-image-${key}`;

    const imgEl = new Image();
    imgEl.id = `user-image-${key}`;
    imgEl.className = "user-image";
    imgEl.src = img[key];
    const captionInput = document.createElement("textarea");
    captionInput.className = "listing-photo-caption-input";
    captionInput.id = `user-listing-photo-caption-${key}`;
    captionInput.value = img.caption ? img.caption : null;
    captionInput.onchange = e => this.handleCaptionChange(e, key);
    const close = document.createElement("i");
    close.className = "fas fa-times closeImageUploader";
    close.onclick = () => this.handleCloseImageUpload(spanA.id, key);
    spanA.appendChild(close);
    spanA.appendChild(imgEl);
    spanA.appendChild(captionInput);
    const uploaderWrapper = document.getElementById("add-image-wrapper");
    uploaderWrapper.appendChild(spanA);
  };
  render() {
    const { props } = this;
    return (
      <form
        className="listing-form"
        encType="multipart/form-data"
        onSubmit={this.handleShowPreview}
      >
        <header>
          <h3>Listing Form</h3>
          <i>* denotes required fields</i>
        </header>
        <section className="listing-form-top">
          <aside className="listing-form-aside">
            <select
              name="catagories"
              id="listing-catagories"
              value={this.state.forumSection}
              onChange={this.handleForumSection}
              required
            >
              <option defaultValue disabled value="">
                Please select a Market Place *
              </option>
              {this.makeSelectMenu()}
            </select>
            <input
              type="text"
              name="title"
              id="listing-title"
              value={this.state.title}
              placeholder="Listing Title *"
              onChange={this.handleTitle}
              required
            />
            <input
              type="number"
              name="price"
              id="listing-price"
              value={this.state.price}
              placeholder="Price in ECD *"
              onChange={this.handlePrice}
              required
            />
            <input
              type="text"
              name="location"
              id="listing-location"
              value={this.state.location}
              placeholder="Where is the item located?"
              onChange={this.handleLocation}
            />
            <input
              type="text"
              name="contact-name"
              id="listing-contact-name"
              value={this.state.contact_name}
              placeholder="Contact Name *"
              onChange={this.handleContactName}
              required
            />
            <input
              type="email"
              name="contact-email"
              id="listing-contact-email"
              value={this.state.contact_email}
              placeholder="Contact Email Address *"
              onChange={this.handleContactEmail}
              required
            />
            <PhoneInput
              type="tel"
              placeholder="Contact Number"
              country="VC"
              value={this.state.contact_phone}
              onChange={value => this.handleContactPhone(value)}
            />
            <textarea
              name="item-description"
              id="listing-form-textbox"
              value={this.state.description}
              onChange={this.handleDescription}
              placeholder="Enter description here..."
            />
          </aside>
          <aside className="listing-form-image-wrapper">
            <h2>Images</h2>

            <span className="add-image-wrapper" id="add-image-wrapper"></span>
            <span id="addImage" onClick={this.handleAddAnotherImage}>
              <i className="fas fa-plus " />
              <p>add image</p>
            </span>
          </aside>
        </section>
        <span className="listing-form-buttons-wrapper">
          {props.edit === true ? (
            <button type="submit">Save Edits</button>
          ) : (
            <button type="submit">Preview Listing</button>
          )}
          <button type="button" onClick={this.resetState}>
            Clear Form
          </button>
          {props.edit === true ? (
            <button type="button" onClick={props.showEditPopUp}>
              Cancel
            </button>
          ) : (
            <button type="button" onClick={() => this.props.history.goBack()}>
              Cancel
            </button>
          )}
        </span>
      </form>
    );
  }
}
