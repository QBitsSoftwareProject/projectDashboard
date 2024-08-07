import React, { useState, useEffect } from "react";
import styles from "../mindRelaxingMethods/mindRelaxingMethod.module.css";
import Dash_btn1 from "../../components/ui/dash_btn/dash_btn1";
import Dash_btn2 from "../../components/ui/dash_btn/dash_btn2";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import cancelIcon from "../../assets/images/dragAndDrop/cancel.png";

import DropFileInput from "../../components/ui/dropFileInput/DropFileInput";

import CreateArticle from "../../components/ui/createArticle/CreateArticle";

import { storage } from "../../config/firebase";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import Swal from "sweetalert2/dist/sweetalert2";

import { v4 } from "uuid";

import axios from "axios";

import uploadImg from "../../assets/images/dragAndDrop/uploadImg.png";

import { storeMethod } from "../../service/methodService";

const ResourceManagement = ({ onPageChange }) => {
  const [isCancel, setIsCancel] = useState(false);
  const [isArticle, setIsArticle] = useState(false);
  const [isAudio, setIsAudio] = useState(false);
  const [isVideo, setIsVideo] = useState(false);

  //resource features
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState();
  const [tags, setTags] = useState([]);

  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState("");

  const [duration, setDuration] = useState("3.15"); // State to store video duration
  const [downloadURL, setdownloadURL] = useState("url1");

  //video features
  const [ifWatch, setIfWatch] = useState(false);
  const [watchCount, setWatchCount] = useState(0);

  //audio features
  const [ifListen, setIfListen] = useState(false);
  const [listenCount, setistenCount] = useState(0);

  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "images/");
  const [imageUrl, setImageUrl] = useState("");

  const [methodUpload, setMethodUpload] = useState(null);
  const methodListRef = ref(storage, "images/");
  const [methodUrl, setMethodUrl] = useState("");

  const [fileName, setFilename] = useState("");
  const [ImgUrl, setImageSrc] = useState(uploadImg);
  const [imgurl, srtImgurl] = useState("");

  const [srcUrl, setMethodSrc] = useState(uploadImg);
  const [methodurl, srtmethod] = useState("");

  const [methodName, setMethodName] = useState("");
  const [mark, setMark] = useState("");
  const [methodType, setMethodType] = useState("");
  const [methodDescription, setMethodDescription] = useState("");

  useEffect(() => {
    setMethodType(fileType);
  }, [fileType]);

  // console.log(isCancel);

  const handleTitleChange = (event) => {
    setMethodName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setMethodDescription(event.target.value);
  };

  const handleSubmit = () => {
    console.log(methodName);
    console.log(methodType);
    console.log(methodCategory);
    console.log(methodDescription);
    console.log(imageUrl);
    console.log(methodUrl);

    storeMethod(
      methodType,
      methodCategory,
      methodName,
      methodDescription,
      imageUrl,
      methodUrl
    );

    refrechForm();
  };

  const refrechForm = () => {
    setMethodName("");
    setMark("");
    setMethodCategory("");
    setMethodDescription("");
    setImageUrl("");
    setMethodUpload("");
    setFilenameMethod("");
    setCategory("");
  };

  const handleTypeChange = (event) => {
    setCategory(event.target.value);
    setIsArticle(false);
    setIsAudio(false);
    setIsVideo(false);
    setFileType("");
    if (event.target.value === "pdf") {
      setIsArticle(true);
      setFileType("pdf");
    } else if (event.target.value === "video") {
      setIsVideo(true);
      setFileType("video");
    } else if (event.target.value === "audio") {
      setIsAudio(true);
      setFileType("audio");
    }
  };

  const [methodCategory, setMethodCategory] = useState("");
  const handleCtegoryChange = (event) => {
    setMethodCategory(event.target.value);
  };
  useEffect(() => {
    console.log(methodCategory);
  }, [methodCategory]);

  const handleFileChange = (file) => {
    setFile(file);
    // setDuration("3.15");
    // Reset duration when a new file is selected
  };

  // const handleVideoLoad = (event) => {
  //   // Access the loaded video element
  //   const videoElement = event.target;

  //   // Update duration state once metadata is loaded
  //   setDuration(videoElement.duration);
  // };

  // Function to reset all state values
  const resetForm = () => {
    // //reset states
    // setTitle("");
    // setTags("");
    // setCategory("");
    // setFile(null);
    // //reset fields
    // document.getElementById("rName").value = "";
    // document.getElementById("rTags").value = "";
    // Reload the current page
    window.location.reload();
  };

  const uploadImage = () => {
    if (imageUpload == null) return;

    const imageRef = ref(storage, `coverImages/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      // alert("Image upload");
      //   toast.success("Image is set");

      getDownloadURL(imageRef)
        .then((url) => {
          //getting the download url for the uploaded image
          console.log("Download URL:", url);

          //set download url for usestate for displayinf in frontend
          setImageUrl(url);
          srtImgurl(url);
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    });
  };

  const uploadMethod = () => {
    console.log("uploading");

    if (!methodUpload) {
      console.error("No file to upload");
      return;
    }

    const methodRef = ref(
      storage,
      `relaxingMethods/${methodUpload.name + v4()}`
    );

    uploadBytes(methodRef, methodUpload)
      .then(() => {
        console.log("Upload successful, fetching download URL...");
        return getDownloadURL(methodRef);
      })
      .then((url) => {
        console.log("Method Download URL:", url);
        setMethodUrl(url);
        srtImgurl(url);
      })
      .catch((error) => {
        console.error("Error uploading resource:", error);
      });
  };

  //to display choosed imaage
  const onChangeFile = (e) => {
    const file = e.target.files[0];
    setFilename(file);
    console.log(fileName);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageSrc(reader.result);
    };

    //for firebase
    setImageUpload(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFilename(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      setImageUpload(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    console.log(fileName);
  }, [fileName]);

  const [filenameMethod, setFilenameMethod] = useState("");

  const onChangeFileMethod = (e) => {
    const file = e.target.files[0];
    setFilenameMethod(file);
    console.log(filenameMethod);
    const reader = new FileReader();
    reader.readAsDataURL(file);
  };

  const handleList = () => {
    console.log("pressed");
    onPageChange("mind-relaxing-methods-list");
  };

  const handleDropMethod = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFilenameMethod(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      //   reader.onload = () => {
      //     // setImageSrc(reader.result);
      //   };
      setMethodUpload(file);
    }
  };

  const handleDragOverMethod = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    console.log(filenameMethod);
  }, [filenameMethod]);

  return (
    <div style={{ height: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Dash_btn1
          btn_text="VIEW METHODS"
          inlineStyle={styles.btnPosition}
          callFunction={handleList}
        />
      </div>
      <Grid
        container
        rowSpacing={3}
        style={{ overflowY: "scroll", height: "90vh" }}
      >
        <Grid
          item
          xs={2}
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <span style={{ fontWeight: "bold", marginLeft: "20px" }}>
            Method name :
          </span>
        </Grid>
        <Grid item xs={10} style={{ paddingRight: "20px" }}>
          <TextField
            id="rName"
            placeholder="Enter Method name"
            label="Enter Method name"
            value={methodName}
            variant="outlined"
            style={{ width: "100%" }}
            onChange={handleTitleChange}
          />
        </Grid>

        <Grid
          item
          xs={2}
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <span style={{ fontWeight: "bold", marginLeft: "20px" }}>
            Method type :
          </span>
        </Grid>
        <Grid item xs={10}>
          <></>
          <FormControl style={{ width: "50%" }} size="small">
            <InputLabel id="demo-select-small-label">
              Select resource type
            </InputLabel>
            <Select
              labelId="demo-select-large-label"
              id="rCategory"
              value={category}
              placeholder="category"
              style={{ height: "55px" }}
              onChange={handleTypeChange}
            >
              <MenuItem value={"video"}>Video</MenuItem>
              <MenuItem value={"audio"}>Audio</MenuItem>
              <MenuItem value={"pdf"}>PDF</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid
          item
          xs={2}
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <span style={{ fontWeight: "bold", marginLeft: "20px" }}>
            Method category :
          </span>
        </Grid>
        <Grid item xs={10}>
          <></>
          <FormControl style={{ width: "50%" }} size="small">
            <InputLabel id="demo-select-small-label">
              Select resource category
            </InputLabel>
            <Select
              labelId="demo-select-large-label"
              id="rCategory"
              value={methodCategory}
              placeholder="category"
              style={{ height: "55px" }}
              onChange={handleCtegoryChange}
            >
              <MenuItem value={"meditation"}>meditation</MenuItem>
              <MenuItem value={"soundTherapy"}>soundTherapy</MenuItem>
              <MenuItem value={"relaxation"}>relaxation</MenuItem>
              <MenuItem value={"physicalActivity"}>physicalActivity</MenuItem>
              <MenuItem value={"inspirationalContent"}>
                inspirationalContent
              </MenuItem>
              <MenuItem value={"cognitiveTraining"}>cognitiveTraining</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid
          item
          xs={2}
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <span style={{ fontWeight: "bold", marginLeft: "20px" }}>
            Method description :
          </span>
        </Grid>
        <Grid item xs={10} style={{ paddingRight: "20px" }}>
          <TextField
            id="rName"
            placeholder="Enter method description"
            label="Enter method description"
            value={methodDescription}
            variant="outlined"
            style={{ width: "100%" }}
            onChange={handleDescriptionChange}
            multiline
            rows={4}
          />
        </Grid>

        <Grid
          item
          xs={6}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            className="second-row"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            style={{
              border: "2px dashed rgb(47, 121, 233)",
              borderRadius: "5px",
              padding: "10px",
              paddingBottom: "20px",
              textAlign: "center",
              width: "90%",
              height: "300px",
            }}
          >
            <input
              type="file"
              onChange={onChangeFile}
              style={{ display: "none" }}
              id="fileInput"
              accept="image/*"
            />

            <div className="img-back" style={{ marginTop: "50px" }}>
              {ImgUrl && (
                <div>
                  <img src={ImgUrl} width={150} alt="Preview" />
                </div>
              )}
              <label
                htmlFor="fileInput"
                style={{ cursor: "pointer", marginTop: "20px" }}
              >
                <div>Drag and drop an image here</div>
              </label>
              <div>
                <button className={styles.imgBtn} onClick={uploadImage}>
                  Confirm image
                </button>
              </div>
            </div>
          </div>
          <h5>Method cover image</h5>
        </Grid>
        <Grid
          item
          xs={6}
          style={{
            flexDirection: "column",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="second-row"
            onDrop={handleDropMethod}
            onDragOver={handleDragOverMethod}
            style={{
              border: "2px dashed rgb(47, 121, 233)",
              borderRadius: "5px",
              padding: "10px",
              paddingBottom: "20px",
              textAlign: "center",
              width: "90%",
              height: "300px",
            }}
          >
            <input
              type="file"
              onChange={onChangeFileMethod}
              style={{ display: "none" }}
              id="fileInput"
              accept="image/*"
            />

            <div className="img-back" style={{ marginTop: "50px" }}>
              <div>
                {filenameMethod ? (
                  <div
                    classname="methods"
                    style={{
                      height: 150,
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                      width: 310,
                    }}
                  >
                    {filenameMethod.name}
                  </div>
                ) : (
                  ImgUrl && (
                    <div>
                      <img src={uploadImg} width={150} alt="Preview" />
                    </div>
                  )
                )}
                <label
                  htmlFor="fileInput"
                  style={{ cursor: "pointer", marginTop: "20px" }}
                >
                  <div>Drag and drop an image here</div>
                </label>
              </div>
              <div>
                <button className={styles.imgBtn} onClick={uploadMethod}>
                  Confirm Resource
                </button>
              </div>
            </div>
          </div>
          <h5>Method resource</h5>
        </Grid>
        <div
          className="uploadBtn"
          style={{
            margin: 30,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            width: "100%",
          }}
        >
          {methodName.trim() != "" &&
          methodCategory != "" &&
          methodType != "" &&
          methodDescription.trim() != "" ? (
            <Dash_btn1
              btn_text="UPLOAD METHOD"
              inlineStyle={styles.btnPosition}
              callFunction={handleSubmit}
            />
          ) : null}
        </div>
      </Grid>
    </div>
  );
};

export default ResourceManagement;
