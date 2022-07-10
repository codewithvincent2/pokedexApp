import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Pokemon() {
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!router.isReady) return;
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setIsLoading(false);
        setPokemon(json);
      });
  }, [router.isReady]);

  return (
    <div className="container">
      {isLoading ? (
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      ) : null}
      {pokemon ? (
        <div className="card">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
            className="card-img-top"
            alt="..."
            style={{ height: "500px", width: "500px" }}
          />
          <div className="card-body">
            <h5 className="card-title">{pokemon.name}</h5>
            <p className="card-text">Weight: {pokemon.weight}</p>
            <Link href="/">
              <a className="btn btn-primary">
                back
              </a>
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
