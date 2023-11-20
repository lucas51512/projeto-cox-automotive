import { Flex } from "@chakra-ui/react";

interface CaixaProps {
  children?: JSX.Element;
  h?: string;
  w?: string;
  justify?: string;
  borderRadius?: string;
  boxShadow?: string;
  mt?: string;
  mb?: string;
  ml?: string;
  mr?: string;
  p?: string;
  bg?: string;
}

/*
xs: Sombra extremamente leve
sm: Sombra Leve
base: Sombra na base da box/flex 
md: Sombra um pouco mais forte que o base
lg: Sombra um pouco mais forte que o md
xl: sombra mais forte que o lg
2xl: sombra bem maior que a do xl
Dark-Lg: sombra bem mais escura que pega boa parte
outline: cria uma ''borda''
inner: a sombra é dentro
*/ 

export default function Caixa(props: CaixaProps) {
  return (
    <>
      <Flex
        justify={props.justify || "left"}
        w={props.w || "100%"}
        h={props.h || "100%"}
        boxShadow={props.boxShadow || 'dark-lg'}
        borderRadius={props.borderRadius || '0px'}
        mb={props.mb || '10px'}
        mt={props.mt || '10px'}
        mr={props.mr || '0px'}
        ml={props.ml || '0px'}
        p={props.p || '20px'}
        bg={props.bg || 'white'}
      >
        {props.children}
      </Flex>
    </>
  );
}
