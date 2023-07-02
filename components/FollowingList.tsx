export default function followingsList({followings}: any) {
  if (followings != undefined) {
    return (
        followings.map((following: any) => (
          <a
          key={following.following.id}
          className="flex flex-col items-center shadow md:flex-row md:max-w-xl"
          title={following.following.name}
          href={`/perfil/${following.following.id}`}
        >
          <div className="avatar">
            <div className="w-24">
              <img src={following.following.image} />
            </div>
          </div>
        </a>
        ))
    )
  } else {
    return(<></>)
  }
}