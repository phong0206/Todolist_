import React, { Component } from "react";
import styled from "styled-components";

const Img = styled.img`
    height: 7vh !important;
    max-width: 12vw !important;
    border-radius: 40%;
    object-fit: cover;
    margin-top: 1vh;
    max-width: 100%;
`;
const Input = styled.input`
    width: 6vw;
    height: 11vh;
    margin-inline: auto;
    margin-top: -11vh;
    opacity: 0;
`;
const Section = styled.section`
    display: flex;
    flex-direction: column;
`;

class ImageUploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
        };

        // if we are using arrow function binding is not required
        //  this.onImageChange = this.onImageChange.bind(this);
    }

    onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            this.setState({
                image: URL.createObjectURL(img),
            });
        }
    };

    render() {
        return (
            <div>
                <div>
                    <Section>
                        <Img src={this.state.image} />
                        <Input
                            accept="image/png, image/jpeg"
                            name="avatar"
                            type="file"
                            onChange={this.onImageChange}
                        />
                        <h4 style={{ color: "brown", marginTop: "0vh" }}>
                            Avatar
                        </h4>
                    </Section>
                </div>
            </div>
        );
    }
}
export default ImageUploader;
