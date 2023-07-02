export default function Home() {
    return (
    <>
    <div className={`hero min-h-screen bg-bookshelf`}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">Bem Vindo!</h1>
                <p className="mb-8">My Read List é uma plataforma inovadora que foi projetada para os amantes de livros de todas as partes do mundo. 
                Com essa plataforma, os usuários têm a oportunidade de criar uma lista personalizada de leitura, avaliar livros e compartilhar suas 
                recomendações com outros leitores entusiasmados. My Read List é o lugar perfeito para os apaixonados pela leitura se conectarem, 
                descobrirem novos títulos e organizarem suas próximas aventuras literárias.</p>
                <a className="ml-2 bg-primary text-white p-3 rounded-md hover:bg-primaryLight" href="/login">Resgistre-se Aqui!</a>
            </div>
        </div>
    </div>
    </>
    )
  }