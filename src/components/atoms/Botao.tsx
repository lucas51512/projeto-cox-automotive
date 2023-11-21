import { Button } from '@chakra-ui/react';

interface BotaoProps {
    tituloBotao: string;
    corBotao: string;
    corTexto: string;
    mx?: string;
    onClick?: () => void;
    type?: boolean;
}

export default function Botao({tituloBotao, corBotao, corTexto, mx, type, onClick}: BotaoProps) {
    return(
        <Button color={corTexto} mx={mx} bgColor={corBotao} type={type ? 'submit': 'button'} onClick={onClick}>{tituloBotao}</Button>
    );
}