import Swal from "sweetalert2";
import axios from "axios";
import { Button } from "flowbite-react";

export default function FollowBtn({ id }: any ) {
    function handleFollow(id: any) {
        axios.delete("/api/follows/deleteFollow", { followingId: id })
        .then((response) => {
            Swal.fire({
                title: "Sucesso!",
                text: "Você parou de seguir este usuário!",
                icon: "success",
                showConfirmButton: false,
                timer: 3000,
            }).then(() => window.location.reload());
        })
        .catch((error) => {
            Swal.fire({
                title: "Erro!",
                text: "Você já segue este usuário! \n" + error,
                icon: "error",
                showConfirmButton: false,
                timer: 3000,
            }).then(() => window.location.reload());
        });
    }

    
    return (
        <button
        className="btn btn-error"
        onClick={() => handleFollow(id)}
        >
        Deixar de seguir
        </button>
    );
}
    