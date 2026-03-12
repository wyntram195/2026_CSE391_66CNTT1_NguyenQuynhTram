const registerForm = document.getElementById("registerForm");
const success = document.getElementById("success");

const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm");
const terms = document.getElementById("terms");

const nameCount = document.getElementById("nameCount");
const strengthLevel = document.getElementById("strengthLevel");
const strengthText = document.getElementById("strengthText");

function showError(id, message){
    document.getElementById(id+"Error").innerText = message;
    document.getElementById(id).classList.add("input-error");
}

function clearError(id){
    document.getElementById(id+"Error").innerText = "";
    document.getElementById(id).classList.remove("input-error");
}

function validateFullname(){
    let regex = /^[A-Za-zÀ-ỹ\s]{3,}$/;

    if(!regex.test(fullname.value.trim())){
        showError("fullname","Tên ≥ 3 ký tự và chỉ chứa chữ");
        return false;
    }
    clearError("fullname");
    return true;
}

function validateEmail(){
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!regex.test(email.value)){
        showError("email","Email không hợp lệ");
        return false;
    }
    clearError("email");
    return true;
}

function validatePhone(){
    let regex = /^0\d{9}$/;

    if(!regex.test(phone.value)){
        showError("phone","SĐT phải 10 số và bắt đầu bằng 0");
        return false;
    }
    clearError("phone");
    return true;
}

function validatePassword(){
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if(!regex.test(password.value)){
        showError("password","≥8 ký tự, có hoa, thường, số");
        return false;
    }
    clearError("password");
    return true;
}

function validateConfirm(){

    if(confirmPassword.value.trim() === ""){
        showError("confirm","Vui lòng nhập lại mật khẩu");
        return false;
    }

    if(confirmPassword.value !== password.value){
        showError("confirm","Mật khẩu không khớp");
        return false;
    }

    clearError("confirm");
    return true;
}

function validateGender(){
    let checked = document.querySelector('input[name="gender"]:checked');

    if(!checked){
        document.getElementById("genderError").innerText =
            "Vui lòng chọn giới tính";
        return false;
    }

    document.getElementById("genderError").innerText="";
    return true;
}

function validateTerms(){
    if(!terms.checked){
        document.getElementById("termsError").innerText =
            "Bạn phải đồng ý điều khoản";
        return false;
    }

    document.getElementById("termsError").innerText="";
    return true;
}

fullname.onblur = validateFullname;
email.onblur = validateEmail;
phone.onblur = validatePhone;
password.onblur = validatePassword;
confirmPassword.onblur = validateConfirm;

fullname.oninput = ()=>clearError("fullname");
email.oninput = ()=>clearError("email");
phone.oninput = ()=>clearError("phone");
password.oninput = ()=>{
    clearError("password");

    if(confirmPassword.value !== ""){
        validateConfirm();
    }
};
confirmPassword.oninput = ()=>clearError("confirm");

fullname.addEventListener("input",function(){
    let len = fullname.value.length;
    nameCount.innerText = `${len}/50`;
});

password.addEventListener("input",function(){

    let value = password.value;

    if(value.length === 0){
        strengthLevel.style.width="0%";
        strengthText.innerText="";
        return;
    }

    let score = 0;

    if(value.length >= 8) score++;
    if(/[A-Z]/.test(value)) score++;
    if(/[a-z]/.test(value)) score++;
    if(/\d/.test(value)) score++;
    if(/[^A-Za-z0-9]/.test(value)) score++;

    if(score <= 2){
        strengthLevel.style.width="33%";
        strengthLevel.style.background="red";
        strengthText.innerText="Yếu";
        strengthText.style.color="red";
    }
    else if(score <=4){
        strengthLevel.style.width="66%";
        strengthLevel.style.background="orange";
        strengthText.innerText="Trung bình";
        strengthText.style.color="orange";
    }
    else{
        strengthLevel.style.width="100%";
        strengthLevel.style.background="green";
        strengthText.innerText="Mạnh";
        strengthText.style.color="green";
    }
});

registerForm.addEventListener("submit",function(e){

    e.preventDefault();

    let valid =
        validateFullname() &
        validateEmail() &
        validatePhone() &
        validatePassword() &
        validateConfirm() &
        validateGender() &
        validateTerms();

    if(valid){
        registerForm.style.display="none";
        success.innerText =
            "Đăng ký thành công! 🎉 Xin chào " + fullname.value;
    }
});