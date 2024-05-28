function showAllCustomer() {
//     lay du lieu tu backend

    $.ajax({
    //     method
        type: "GET",
    //     API
        url: "http://localhost:8080/api/customers",
    //     xu ly khi thanh cong
        success: function (dulieu) {
            console.log(dulieu)
            if (dulieu!=null || dulieu.length>0){
                let content="";
                for (let i = 0; i < dulieu.length; i++) {
                    content+=`<tr>
        <td>${dulieu[i].id}</td>
        <td>${dulieu[i].firstName}</td>
        <td>${dulieu[i].lastName}</td>
        <td>${dulieu[i].province.name}</td>
        <td><a onclick="deleteCustomer(${dulieu[i].id})">Delete</a></td>
    </tr>`
                }
                //     dien du lieu vao bang
                document.getElementById("content").innerHTML = content;
            }
            else {
                document.getElementById("content").innerHTML = "khong co du lieu";

            }

        }

    })


}
showAllCustomer();
function createNewCustomer() {
//     lay du lieu
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let province = +document.getElementById("province").value;
    let customer = {
        "firstName": firstName,
        "lastName": lastName,
        "province": {
            "id": province
        }
    }
    console.log(customer)
//     goi AJAX tao moi
    $.ajax({
        // muon day du lieu JSON len, cau hinh headers cho AJAX
        // sai: header
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        url: "http://localhost:8080/api/customers",
        // chuyen object -> JSON

        data: JSON.stringify(customer),
        success: function (){
            //     hien thi lai danh sach
            showAllCustomer()
        }
    })

}

function deleteCustomer(id) {
    // event.preventDefault();
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/api/customers/"+id,
        success: function (){
            showAllCustomer()
        }
    })
}

