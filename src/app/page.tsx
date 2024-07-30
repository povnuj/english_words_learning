
'use client'
import { useContext, useEffect, useState} from "react";
import { Box, Breakpoint, Container, Typography, styled } from "@mui/material";
import MainContainer from "./components/Conatiners/MainContainer";
import { Colors } from "./theme/colors";

const MMainCard = styled(Box,{
  name: 'MMainCard',
  slot: 'root',
})(({}) => ({
  //color: Colors.main,

}));

export default async function Home() {

  return (
    <MainContainer>
      <MMainCard>
        <Typography variant="h2" color={Colors.light}>Present Continous</Typography>
        <div className="block_container">
          <Typography variant="subtitle1" color={Colors.light}>Коли використовувати:</Typography>
          <ul>
            <li><Typography variant="caption" color={Colors.light}>Дія яка відбувається зараз</Typography></li>
            <li><Typography variant="caption" color={Colors.light}>Тимчасова ситуація</Typography></li>
          </ul>
        </div>
        <div className="block_container">
          <Typography variant="subtitle1" color={Colors.light}>Допоміжні слова:</Typography>
          <ul>
            <li><Typography variant="caption" color={Colors.light}>Today</Typography></li>
            <li><Typography variant="caption" color={Colors.light}>Now</Typography></li>
            <li><Typography variant="caption" color={Colors.light}>Right now</Typography></li>
            <li><Typography variant="caption" color={Colors.light}>At the moment</Typography></li>
            <li><Typography variant="caption" color={Colors.light}>This week / month / etc</Typography></li>
          </ul>
        </div>
        <div className="block_container">
          <Typography variant="subtitle1" color={Colors.light}>Як використовувати:</Typography>
              <div className="word_form_block">
                <div className="word_form_block-sec1">
                  <div>I</div>
                  <div>He / She / It</div>
                  <div>You / We / They</div>
                </div>
                <div className="word_form_block-sec2">
                  <div>am</div>
                  <div>is</div>
                  <div>are</div>
                </div>
                <div className="word_form_block-sec4">
                  <div className="line_top"></div>
                  <div className="line_middle"></div>
                  <div className="line_bottom"></div>
                </div>
                <div className="word_form_block-sec3">
                  <div>verb + ing</div>
                </div>
              </div>
        </div>
      </MMainCard>
    </MainContainer>
  );
}
