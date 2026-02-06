export const DONATOR_MILESTONES = [500, 1000, 3000] as const;

export const NEAR_MILESTONE_THRESHOLD = 50;

export interface DonatorMilestoneConfig {
  title: string;
  message: string;
  image: string;
}

export const DONATOR_MILESTONE_CONFIG: Record<number, DonatorMilestoneConfig> =
  {
    500: {
      title: 'ขอบคุณสุดหล่อ!',
      message: 'ขอบคุณสำหรับการสนับสนุน!',
      image: 'https://c.tenor.com/dOW-TAQ8zXMAAAAC/tenor.gif',
    },
    1000: {
      title: 'กราบขอบคุณสองที!',
      message: 'แรงสนับสนุนของคุณมีความหมายมาก!',
      image: 'https://c.tenor.com/SLcqntOTrikAAAAC/tenor.gif',
    },
    3000: {
      title: 'ขอบคุณเสี่ยสุดหล่อ!',
      message: 'ขอบคุณที่อยู่เคียงข้างกันเสมอ!',
      image: 'https://c.tenor.com/gVIWRZcscrYAAAAC/tenor.gif',
    },
  };

export const NEAR_MILESTONE_IMAGE =
  'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnV3Z2wzbWkyeTFlZXV3N2d2a2NqcjBuYzdha2dsa3Q0Ym9pZWZnbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MDJ9IbxxvDUQM/giphy.gif';
