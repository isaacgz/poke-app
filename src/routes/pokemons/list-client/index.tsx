import { $, component$, useContext, useOnDocument, useStore, useTask$, useVisibleTask$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { PokemonListContext } from '~/context';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import type { SmallPokemon } from '~/interfaces';

interface PokemonPageState {
    currentPage: number;
    isLoading: boolean;
    pokemons: SmallPokemon[];
}


export default component$(() => {
    
    // const pokemonState = useStore<PokemonPageState>({
    //     currentPage: 0,
    //     isLoading: false,
    //     pokemons: []
    // });
    const pokemonList = useContext( PokemonListContext );


    // useVisibleTask$(async({ track }) => {

    //     track( () => pokemonState.currentPage);

    //     const pokemons = await getSmallPokemons( pokemonState.currentPage * 10);
    //     pokemonState.pokemons = [ ...pokemonState.pokemons, ...pokemons ];
    // });

    
    useTask$(async({ track }) => {

        track( () => pokemonList.currentPage);

        pokemonList.isLoading = true;

        const pokemons = await getSmallPokemons( pokemonList.currentPage * 10, 30);
        pokemonList.pokemons = [ ...pokemonList.pokemons, ...pokemons ];

        pokemonList.isLoading = false;
    });

    useOnDocument('scroll', $((event) => {
        const maxScroll = document.body.scrollHeight;
        const currentScroll = window.scrollY + window.innerHeight;

        if ( (currentScroll + 200) >= maxScroll && !pokemonList.isLoading){
            pokemonList.isLoading = true;
            pokemonList.currentPage++;
        }

    }))

    return (
        <>
            <div class="flex flex-col">
                <span class="my-5 text-5xl">Status</span>
                <span>Página actual: { pokemonList.currentPage }</span>
                <span>Está cargando: </span>
            </div>

            <div class="mt-10">
                {/* <button onClick$={() => pokemonState.currentPage-- } class="btn btn-primary mr-2">Anteriores</button> */}
                <button onClick$={() => pokemonList.currentPage++ }class="btn btn-primary mr-2">Siguientes</button>
            </div>

            <div class="grid sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-7 grid-cols-6 mt-5">
                {
                    pokemonList.pokemons.map(({name, id}) => (
                        <div key={ name } class="m-5 flex flex-col justify-center items-center">
                            <PokemonImage id={id} />
                            <span class="capitalize">{name}</span>
                        </div>
                    ))
                }
            </div>
        </>
    )
});

export const head: DocumentHead = {
    title: 'List - Client',
  };
  