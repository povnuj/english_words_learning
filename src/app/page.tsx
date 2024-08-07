
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
        <section>
          <Typography variant="h2" color={Colors.light}>Present Simple</Typography>
          <div className="block_container">
            <Typography variant="subtitle1" color={Colors.light}>Коли використовувати:</Typography>
            <ul>
              <li><Typography variant="caption" color={Colors.light}>Теперішні звички</Typography></li>
              <li><Typography variant="caption" color={Colors.light}>Регулярні дії</Typography></li>
              <li><Typography variant="caption" color={Colors.light}>Стани</Typography></li>
              <li><Typography variant="caption" color={Colors.light}>Загальні факти</Typography></li>
            </ul>
          </div>
          <div className="block_container">
            <Typography variant="subtitle1" color={Colors.light}>Допоміжні слова:</Typography>
            <ul>
              <li><Typography variant="caption" color={Colors.light}>Always</Typography></li>
              <li><Typography variant="caption" color={Colors.light}>Usually</Typography></li>
              <li><Typography variant="caption" color={Colors.light}>Often</Typography></li>
              <li><Typography variant="caption" color={Colors.light}>Sometimes</Typography></li>
              <li><Typography variant="caption" color={Colors.light}>Rearly</Typography></li>
              <li><Typography variant="caption" color={Colors.light}>Never</Typography></li>
              <li><Typography variant="caption" color={Colors.light}>Once / Twice / Etc</Typography></li>
            </ul>
          </div>
          <div className="block_container">
            <Typography variant="subtitle1" color={Colors.light}>Як використовувати:</Typography>
                <div className="word_form_block">
                  <div className="word_form_block-sec1">
                    <div>I / You / We / They</div>
                    <div>He / She / It</div>
                  </div>
                  <div className="word_form_block-sec2">
                    <div></div>
                    <div>s / es</div>
                  </div>
                  <div className="word_form_block-sec2">
                    <div>? - Do</div>
                    <div>? - Does</div>
                  </div>
                  <div className="word_form_block-sec2">
                    <div>х -  Do not</div>
                    <div>x - Does not</div>
                  </div>
                </div>
          </div>
        </section>
        <section>
          <Typography variant="h2" color={Colors.light}>Present Continuous</Typography>
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
        </section>
        <section>
          <Typography variant="h2" color={Colors.light}>Present Perfect Simple</Typography>
          <div className="block_container">
            <Typography variant="subtitle1" color={Colors.light}>Коли використовувати:</Typography>
            <ul>
              <li><Typography variant="caption" color={Colors.light}>Дії які почались у минулому але ще досі дійсні</Typography></li>
              <li><Typography variant="caption" color={Colors.light}>Завершені дії про які не згадано (досвід)</Typography></li>
              <li><Typography variant="caption" color={Colors.light}>Завершені дії де важливий результат</Typography></li>
            </ul>
          </div>
          <div className="block_container">
            <Typography variant="subtitle1" color={Colors.light}>Допоміжні слова:</Typography>
            <ul>
              <li><Typography variant="caption" color={Colors.light}>For</Typography></li>
              <li><Typography variant="caption" color={Colors.light}>Since</Typography></li>
              <li><Typography variant="caption" color={Colors.light}>Just</Typography></li>
              <li><Typography variant="caption" color={Colors.light}>Already</Typography></li>
              <li><Typography variant="caption" color={Colors.light}>Yet</Typography></li>
              <li><Typography variant="caption" color={Colors.light}>Ever</Typography></li>
              <li><Typography variant="caption" color={Colors.light}>Never</Typography></li>
              <li><Typography variant="caption" color={Colors.light}>It is the</Typography></li>
              <li><Typography variant="caption" color={Colors.light}>First time</Typography></li>
            </ul>
          </div>
          <div className="block_container">
            <Typography variant="subtitle1" color={Colors.light}>Як використовувати:</Typography>
                <div className="word_form_block">
                  <div className="word_form_block-sec1">
                    <div>I / You / We / They</div>
                    <div>He / She / It</div>
                  </div>
                  <div className="word_form_block-sec2">
                    <div>Have + past participle</div>
                    <div>Has + past participle</div>
                  </div>
                  <div className="word_form_block-sec2">
                    <div>? - Have</div>
                    <div>? - Has</div>
                  </div>
                  <div className="word_form_block-sec2">
                    <div>х -  Have not</div>
                    <div>x - Has not</div>
                  </div>
                </div>
          </div>
        </section>
        <section>
          <Typography variant="h2" color={Colors.light}>Present Perfect Continuous</Typography>
          <div className="block_container">
            <Typography variant="subtitle1" color={Colors.light}>Коли використовувати:</Typography>
            <ul>
              <li><Typography variant="caption" color={Colors.light}>Ситуація яка почалась у минулому, або тільки що і ще досі дійсні</Typography></li>
              <li><Typography variant="caption" color={Colors.light}>(Акцент на часі події)</Typography></li>
            </ul>
          </div>
          <div className="block_container">
            <Typography variant="subtitle1" color={Colors.light}>Допоміжні слова:</Typography>
            <ul>
              <li><Typography variant="caption" color={Colors.light}>For</Typography></li>
              <li><Typography variant="caption" color={Colors.light}>Since</Typography></li>
              <li><Typography variant="caption" color={Colors.light}>Just</Typography></li>
            </ul>
          </div>
          <div className="block_container">
            <Typography variant="subtitle1" color={Colors.light}>Як використовувати:</Typography>
                <div className="word_form_block">
                  <div className="word_form_block-sec1">
                    <div>I / You / We / They</div>
                    <div>He / She / It</div>
                  </div>
                  <div className="word_form_block-sec2">
                    <div>Have + been + verb + ing</div>
                    <div>Has + been + verb + ing</div>
                  </div>
                  <div className="word_form_block-sec2">
                    <div>? - Have</div>
                    <div>? - Has</div>
                  </div>
                  <div className="word_form_block-sec2">
                    <div>х -  Have not</div>
                    <div>x - Has not</div>
                  </div>
                </div>
          </div>
        </section>
      </MMainCard>
    </MainContainer>
  );
}
