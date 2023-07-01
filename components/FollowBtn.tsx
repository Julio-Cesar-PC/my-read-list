import Swal from "sweetalert2";
import axios from "axios";
import { Button } from "flowbite-react";

export default function FollowBtn({ id }: any ) {
    function handleFollow(id: any) {
        axios.post("/api/follows/createFollow", { followingId: id })
        .then((response) => {
            Swal.fire({
                title: "Sucesso!",
                text: "Você seguiu este usuário!",
                icon: "success",
                showConfirmButton: false,
                timer: 3000,
            }).then(() => window.location.reload());
        })
        .catch((error) => {
            Swal.fire({
                title: "Erro!",
                text: "Você já segue este usuário!",
                icon: "error",
                showConfirmButton: false,
                timer: 3000,
            }).then(() => window.location.reload());
        });
    }

    
    return (
        <Button
        className="btn btn-primary"
        onClick={() => handleFollow(id)}
        >
        Seguir
        </Button>
    );
}
    