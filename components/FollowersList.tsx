import Link from "next/link"

export default function FollowersList({followers}: any) {
  if (followers != undefined) {
    return (
        followers.map((follower: any) => (
            <Link
              key={follower.follower.id}
              className="flex flex-col items-center shadow md:flex-row md:max-w-xl"
              title={follower.follower.name}
              href={`/perfil/${follower.follower.id}`}
            >
              <div className="avatar">
                <div className="w-24">
                  <img src={follower.follower.image} />
                </div>
              </div>
            </Link>
        ))
    )
  } else {
    return(<></>)
  }
}