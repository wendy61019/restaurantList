const deleteButtons = document.querySelectorAll('.delete-button')

//monitor all delete buttons when clicked
deleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click', function deleteData(event) {
        const id = deleteButton.dataset.id
        swal({
            title: "確定刪除資料嗎",
            text: "一旦刪除，你將無法復原資料！",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#e85d04",
            confirmButtonText: "確定刪除！",
            cancelButtonText: "取消!",
            closeOnConfirm: false
        }).then(result => {
            if(result.isConfirmed) {
                swal("資料已刪除！",
                "",
                "success"
                )
            }
        }).then(result => {
            if (result) {
            axios.delete(`/restaurants/${id}`)
              .then(() => window.location.href ='/')
              .catch(error => console.log(error))
            }
        })
    })
})
