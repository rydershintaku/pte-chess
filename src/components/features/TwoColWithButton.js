import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import cat from "images/cat.png"
import hotDog from "images/hot dog.png"
import {ReactComponent as SvgDotPattern } from "images/dot-pattern.svg"
import SimpleFiveColumn from '../footers/SimpleFiveColumn';
import { LogoLink } from '../headers/light';
import chessHorse from '../../images/chess-horse.svg';
import chessboardInProgress from "images/chessBoardInProgress.jpg"


const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col max-w-sm mx-auto md:mx-0`
const Input = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`
const Textarea = styled(Input).attrs({as: "textarea"})`
  ${tw`h-24`}
`

const SubmitButton = tw(PrimaryButtonBase)`inline-block mt-8`



const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24 items-center`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-6/12 flex-shrink-0 relative`;
const TextColumn = styled(Column)(props => [
  tw`md:w-6/12 mt-16 md:mt-0`,
  props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);
const Row = tw.div`flex`;
const NavRow = tw(Row)`flex flex-col lg:flex-row items-center justify-between`;
const NavLink = tw.a`mt-4 lg:mt-0 transition duration-300 font-medium pb-1 border-b-2 mr-12 text-gray-700 border-gray-400 hocus:border-gray-700`;
const Nav2 = tw.a`mt-4 lg:mt-0 transition duration-300 font-medium pb-1 border-b-2 mr-12 text-gray-700 border-gray-400 hocus:border-gray-700 pointer-events-none`;
const PrimaryNavLink = tw(
  NavLink
)`text-gray-100 bg-primary-500 px-6 py-3 border-none rounded hocus:bg-primary-900 focus:shadow-outline mt-6 md:mt-4 lg:mt-0`;

const Image = styled.img(props => [
  props.imageRounded && tw`rounded`,
  props.imageBorder && tw`border`,
  props.imageShadow && tw`shadow`,
]);

const DecoratorBlob = styled(SvgDotPattern)(props => [
  tw`w-20 h-20 absolute right-0 bottom-0 transform translate-x-1/2 translate-y-1/2 fill-current text-primary-500 -z-10`,
])

const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(
  SectionHeading
)`mt-4 font-black text-left text-2xl sm:text-3xl lg:text-2xl text-center md:text-left leading-tight`;

const PrimaryButton = styled(PrimaryButtonBase)(props => [
  tw`mt-8 md:mt-8 text-sm inline-block mx-auto md:mx-0`,
  props.buttonRounded && tw`rounded-full`
]);


export default ({
                  submitButtonText = "Send", formAction = "#", formMethod = "get",
  heading = (
    <>
      You are currently playing for against <span tw="text-primary-500"> XxYasuoMainxX </span> for <span tw="text-primary-500">.034 ETH.</span>
    </>
  ),
  user1 = "TheBestEver",
  user2 = "XxYasuoMainxX",
  primaryButtonText = "Resign",
  secondaryButtonText = "Draw",
  primaryButtonUrl = "https://timerse.com",
  imageSrc = chessboardInProgress,
  dogSrc = hotDog,
  catSrc = cat,
  buttonRounded = true,
  imageRounded = true,
  imageBorder = false,
  imageShadow = false,
  imageCss = null,
  imageDecoratorBlob = false,
  imageDecoratorBlobCss = null,
  textOnLeft = true
}) => {
  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.

  return (
    <Container>
      <NavRow>
        <LogoLink href="/">
          <img src={chessHorse} alt="" />
          P-2-E Chess
        </LogoLink>
        <div tw="flex flex-wrap justify-center lg:justify-end items-center -mr-12">
          <Nav2 target="_blank" href="http://localhost:3000/components/blocks/FAQS/SingleCol">
            0.0001 ETH
          </Nav2>
          <NavLink target="_blank" href="http://localhost:3000/components/blocks/FAQS/SingleCol">
            Profile
          </NavLink>
          <div tw="md:hidden flex-100 h-0"></div>
          <PrimaryNavLink target="_blank" href="http://localhost:3000/">
            Return Home
          </PrimaryNavLink>
        </div>
      </NavRow>
      <TwoColumn>
        <div className="image-container">
          <div style={{ display: 'flex', alignItems: 'stretch' }}>
            <Image style={{ backgroundColor: 'black', height: 50, width: 50 }} css={imageCss} src={catSrc}></Image>
          <Subheading style={{ marginLeft: '10px' }}>{user1}</Subheading>
          </div>
          <ImageColumn>
            <Image  css={imageCss} src={imageSrc} imageBorder={imageBorder} imageShadow={imageShadow} imageRounded={imageRounded}/>
            {imageDecoratorBlob && <DecoratorBlob css={imageDecoratorBlobCss} />}
          </ImageColumn>
          <div style={{ display: 'flex', alignItems: 'stretch' }}>
          <Image style={{ backgroundColor: 'black', height: 50, width: 50 }} css={imageCss} src={dogSrc}></Image>
          <Subheading style={{ marginLeft: '10px', marginTop: '25px' }}>{user2}</Subheading>
            <Heading style={{ marginLeft: '135px', marginTop: '25px' }}>1:19</Heading>
          </div>
        </div>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            <Heading>{heading}</Heading>

            <TextColumn textOnLeft={textOnLeft}>
              <TextContent>
                <Form action={formAction} method={formMethod}>
                  <Textarea name="message" placeholder="Send Your Message Here" />
                  <SubmitButton type="submit">{submitButtonText}</SubmitButton>
                </Form>
              </TextContent>
            </TextColumn>

            <PrimaryButton buttonRounded={buttonRounded} as="a" href={primaryButtonUrl}>
              {primaryButtonText}
            </PrimaryButton>
            <PrimaryButton buttonRounded={buttonRounded} as="a" href={primaryButtonUrl} style={{ marginLeft: '50px' }}>
              {secondaryButtonText}
            </PrimaryButton>
          </TextContent>
        </TextColumn>
        <Textarea style={{height: 400, width: 400 }} name="message" placeholder="You and Your Opponent's Messages Appear Here" />
      </TwoColumn>
      <SimpleFiveColumn/>
    </Container>
  );
};
