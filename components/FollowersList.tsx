
export default function FollowersList({followers}: any) {
    return (
        followers.map((follower: any) => (
            <a
              key={follower.follower.id}
              className="flex flex-col items-center border shadow md:flex-row md:max-w-xl"
              title={follower.follower.name}
              href={`/perfil/${follower.follower.id}`}
            >
              <div className="avatar">
                <div className="w-24">
                  <img src={follower.follower.image} />
                </div>
              </div>
            </a>
        ))
    )
}