import Swal from "sweetalert2";



export class Alerts {
    static success(text: string) {
        Swal.fire({
            title: 'Success',
            text,
            icon: 'success',
              iconColor:"#ffa3f1",
           
        })
    }

    static error(text: string) {
        Swal.fire({
            title: 'Error',
            text,
            icon: 'error',
              iconColor:"rgb(242, 104, 255)",
              

           
        })
    }

    static async confirm(text: string, callback: Function) {
        const result = await Swal.fire({
            title: "Are you sure?",
            text,
            icon: "question",
            iconColor:"#ffa3f1",
            showCancelButton: true,
            confirmButtonColor: "#ffa3f1",
            cancelButtonColor: "rgb(242, 104, 255)",
            confirmButtonText: "Yes",
            
           
        })

        if (result.isConfirmed) {
            await callback()
        }
    }
}