import {
   Footer,
   FooterCopyright,
   FooterLink,
   FooterLinkGroup,
} from "flowbite-react";

function FooterCmp() {
   return (
      <Footer container>
         <FooterCopyright href="https://github.com/JoseRefugio2305" by="José Refugio Rivera" year={2025} />
         <FooterLinkGroup>
            <FooterLink href="https://github.com/JoseRefugio2305">Git Hub</FooterLink>
            <FooterLink href="https://www.linkedin.com/in/jose-refugio/">Linkedin</FooterLink>
            <FooterLink href="mailto:joserefugioriveramendoza@gmail.com">GMail</FooterLink>
         </FooterLinkGroup>
      </Footer>
   );
}

export default FooterCmp;
