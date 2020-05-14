import React, { Component } from "react";
import "./UserSettings.css";

export default class UserSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: "",
    };
  }
  render() {
    return (
      <section>
        <heder>
          <h3>Profile Settings</h3>
        </heder>
        <article>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
            deserunt aspernatur a eaque nihil facilis, fugit veritatis magni,
            maxime placeat quidem, alias quas impedit tempore velit. Explicabo
            mollitia eveniet modi illo perferendis nemo, sit cum qui dolor
            obcaecati sint asperiores dolorum quod. Libero consequatur
            temporibus illo cum rerum adipisci nam maxime, dolor odio doloremque
            ipsum, harum aliquam nemo expedita magnam. Et pariatur ex quidem?
            Harum quisquam asperiores quae tempore ipsa hic recusandae nulla
            illum. Labore voluptate fugiat aliquam velit eaque culpa accusantium
            distinctio enim animi amet architecto nobis impedit molestiae
            explicabo odio, dolor perspiciatis iure facere consequuntur rerum
            laboriosam asperiores?
          </p>
        </article>
      </section>
    );
  }
}
