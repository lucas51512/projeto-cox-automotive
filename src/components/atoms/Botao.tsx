import { Button } from '@chakra-ui/react';

interface BotaoProps {
    tituloBotao: string;
    corBotao: string;
}

export default function Botao({tituloBotao, corBotao}: BotaoProps) {
    return(
        <Button color={corBotao}>{tituloBotao}</Button>
    );
}