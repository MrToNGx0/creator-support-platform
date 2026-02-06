export interface DonateLevel {
  min: number;
  max: number;
  title: string;
  gif?: string;
}

export const DONATE_LEVELS: DonateLevel[] = process.env.DONATE_LEVELS
  ? (JSON.parse(process.env.DONATE_LEVELS) as DonateLevel[])
  : [
      {
        min: 0,
        max: 50,
        title: 'ผู้สนับสนุนระดับหมอรำ!',
        gif: 'https://media.giphy.com/media/HmO7FZjok6mhW/giphy.gif',
      },
      {
        min: 51,
        max: 100,
        title: 'ผู้สนับสนุนระดับพิเศษ!',
        gif: 'https://media.giphy.com/media/CIe1iwzke30wU/giphy.gif',
      },
      {
        min: 101,
        max: 300,
        title: 'ผู้สนับสนุนระดับซุปเปอร์!',
        gif: 'https://media.giphy.com/media/11nuvoZGgSH3Ne/giphy.gif',
      },
      {
        min: 301,
        max: 999999,
        title: 'ผู้สนับสนุนระดับตำนาน!',
        gif: 'https://media.giphy.com/media/rfqZyGGilNv20/giphy.gif',
      },
    ];
