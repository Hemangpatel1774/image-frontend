

let result = []
const uploadImg = () => {
    result = [];
    const img = document.getElementById("img");
    const file = document.getElementById("file");
    const totalImg = document.getElementById("total-img");
    const totalImgSize = document.getElementById("total-img-size");
    const imgArea = document.getElementById("img-area");
    const imgList = document.getElementById("image-list");
    const passIn = document.getElementById("pass");
    const SubBtn = document.getElementById("submit-btn");
    imgList.innerHTML = "";
    let len = file.files.length;
    let size = 0
    totalImg.innerHTML = "Total Images : " + len;
    for (let i = 0; i < len; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(file.files[i]);
        size += file.files[i].size
        reader.onload = async () => {
            result.push(reader.result);
            imgList.innerHTML += `<div class="img-area" id="img-area"><img src="${reader.result}" id="img"/></div>`
        }
    }
    totalImgSize.innerHTML = "Total Size ≈ " + (size / 1000000).toFixed(3) + " MB ";
    setTimeout(() => {
        if ((size / 1000000) > 5) {
            alert("Total size of images should be less than 5 MB")
            imgList.innerHTML = "";
            totalImg.innerHTML = "Total Images : 0";
            totalImgSize.innerHTML = "Total Size : 0 MB";
            file.value = "";
            return
        }
        SubBtn.style.display = "block";
        passIn.style.display = "block";
    }, 100);

}
const SubmitImgs = () => {
    const passIn = document.getElementById("pass");
    const file = document.getElementById("file");
    const totalImg = document.getElementById("total-img");
    const totalImgSize = document.getElementById("total-img-size");
    const SubBtn = document.getElementById("submit-btn");
    const imgList = document.getElementById("image-list");
    if (passIn.value.length != 4) {
        alert("Password should be of 4 digits")
        return
    }
    alert("password is require for Download Images..🫡 [ REMENBER IT ] ")
    fetch("https://image-server-omega.vercel.app/img", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ images: result, pass: passIn.value })
    }).then((res) => {
        if (res) {
            imgList.innerHTML = "";
            totalImg.innerHTML = "Total Images : 0";
            totalImgSize.innerHTML = "Total Size : 0 MB";
            file.value = "";
            SubBtn.style.display = "none";
            passIn.style.display = "none";
            passIn.value = "";
            alert("Images Uploaded Successfully")
            console.log(res);

        }
    });
}




const getMyImage = () => {
    const password = document.getElementById("get-pass");
    if (password.value.length != 4) {
        alert("Password should be of 4 digits")
        return
    }
    fetch(`https://image-server-omega.vercel.app/getimg/${password.value}`, {
        method: "GET",
        // headers: {
        //     "Content-Type": "application/json",
        // },
    }).then((res) => res.json())
        .then((data) => {
            generateLink(data.images);
        })
        .catch((error) => {
            alert("No image found")
            console.error('Error:', error);
        });
}
const generateLink = (data) => {
    const imgList = document.getElementById("image-list-2");
    imgList.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        imgList.innerHTML += `<div class="img-area" id="img-area"><img src="${data[i]}" id="img"/></div>`
    }
    const DelBtn = document.getElementById("delete-btn");
    DelBtn.style.display = "block";
}

const deleteimages = () => {
    const imgList = document.getElementById("image-list-2");
    const password = document.getElementById("get-pass");
    const DelBtn = document.getElementById("delete-btn");
    if (password.value.length != 4) {
        alert("Password should be of 4 digits")
        return
    }
    fetch(`https://image-server-omega.vercel.app/deleteimg/${password.value}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(() => {
        alert("images deleted successfully..!");
        DelBtn.style.display = "block";
        imgList.innerHTML = "";
        password.value = "";
    }
    )
        .catch((error) => {
            console.error('Error:', error);
        });
}