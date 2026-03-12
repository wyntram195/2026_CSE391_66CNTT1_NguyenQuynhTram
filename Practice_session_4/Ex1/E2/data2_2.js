const form = document.getElementById("orderForm");

const product = document.getElementById("product");
const quantity = document.getElementById("quantity");
const delivery = document.getElementById("delivery");
const address = document.getElementById("address");
const note = document.getElementById("note");

const totalEl = document.getElementById("total");
const noteCount = document.getElementById("noteCount");

const confirmBox = document.getElementById("confirmBox");
const summary = document.getElementById("summary");
const success = document.getElementById("success");

/* =====================
   GIÁ SẢN PHẨM
===================== */

const prices = {
    "Áo":150000,
    "Quần":200000,
    "Giày":500000
};

/* =====================
   HELPER
===================== */

function showError(id,msg){
    document.getElementById(id+"Error").innerText = msg;
    document.getElementById(id).classList.add("input-error");
}

function clearError(id){
    document.getElementById(id+"Error").innerText="";
    document.getElementById(id).classList.remove("input-error");
}

/* =====================
   TÍNH TIỀN
===================== */

function updateTotal(){
    let p = product.value;
    let q = Number(quantity.value);

    if(prices[p] && q>0){
        let total = prices[p]*q;
        totalEl.innerText = total.toLocaleString("vi-VN");
    }else{
        totalEl.innerText="0";
    }
}

product.onchange = updateTotal;
quantity.oninput = updateTotal;

/* =====================
   NOTE COUNT
===================== */

note.oninput = function(){
    let len = note.value.length;
    noteCount.innerText = len + "/200";

    if(len>200){
        noteCount.style.color="red";
        showError("note","Tối đa 200 ký tự");
    }else{
        noteCount.style.color="black";
        clearError("note");
    }
};

/* =====================
   VALIDATE
===================== */

function validateProduct(){
    if(product.value===""){
        showError("product","Chọn sản phẩm");
        return false;
    }
    clearError("product");
    return true;
}

function validateQuantity(){
    let q = Number(quantity.value);
    if(!Number.isInteger(q) || q<1 || q>99){
        showError("quantity","1–99");
        return false;
    }
    clearError("quantity");
    return true;
}

function validateDelivery(){
    let selected = new Date(delivery.value);
    let today = new Date();
    today.setHours(0,0,0,0);

    let max = new Date();
    max.setDate(today.getDate()+30);

    if(selected < today || selected > max){
        showError("delivery","Ngày trong 30 ngày tới");
        return false;
    }

    clearError("delivery");
    return true;
}

function validateAddress(){
    if(address.value.trim().length <10){
        showError("address","Ít nhất 10 ký tự");
        return false;
    }
    clearError("address");
    return true;
}

function validatePayment(){
    let checked = document.querySelector('input[name="payment"]:checked');
    if(!checked){
        document.getElementById("paymentError").innerText="Chọn phương thức";
        return false;
    }
    document.getElementById("paymentError").innerText="";
    return true;
}

/* =====================
   SUBMIT
===================== */

form.addEventListener("submit",function(e){

    e.preventDefault();

    let valid =
        validateProduct() &
        validateQuantity() &
        validateDelivery() &
        validateAddress() &
        validatePayment();

    if(!valid) return;

    // HIỆN XÁC NHẬN
    confirmBox.style.display="block";

    summary.innerHTML = `
        Sản phẩm: ${product.value}<br>
        Số lượng: ${quantity.value}<br>
        Tổng tiền: ${totalEl.innerText} VNĐ<br>
        Ngày giao: ${delivery.value}
    `;
});

document.getElementById("confirmBtn").onclick=function(){
    confirmBox.style.display="none";
    form.style.display="none";
    success.innerText="🎉 Đặt hàng thành công!";
};

document.getElementById("cancelBtn").onclick=function(){
    confirmBox.style.display="none";
};