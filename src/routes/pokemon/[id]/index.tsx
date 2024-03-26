import { component$, useContext } from '@builder.io/qwik';
import { routeLoader$, useLocation, type DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '../../../components/pokemons/pokemon-image';
import { PokemonGameContext } from '~/context';


export const usePokemonId = routeLoader$<number>(( { params, redirect } ) => {

    const id = Number(params.id);
    if ( isNaN(id )) redirect(301, '/');
    if ( id <= 0) redirect(301, '/');
    if ( id > 1000) redirect(301, '/');
    return id;
})


export default component$(() => {

    // const location = useLocation();
    const pokemonId = usePokemonId();

  const pokemonGame = useContext( PokemonGameContext );

  return (
    <>
        {/* <span class="text-5xl">Pokemon: { location.params.id } </span> */}
        <span class="text-5xl">Pokemon: { pokemonGame.pokemonId } </span>

        <PokemonImage 
            id={ pokemonGame.pokemonId }
            isVisible= { pokemonGame.isPokemonVisible }
            backImage= { pokemonGame.showBackImage }
        />
    </>
  )
});

export const head: DocumentHead = {
    title: 'Pokemon ',
  };
  