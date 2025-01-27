# MDCU Insight Registration Website

## Features

- Registration
- Issuing certificate
- Certificate verification
- Display recorded videos
- Admin page

## Required maintenance

- Archive previous participants

  ```sql
  UPDATE Registration
  SET archive = 1
  WHERE archive = 0 AND event_number = [event_number]; -- Replace [event_number] with the event number that you want to archive
  ```

- Update event's information, questions, recorded videos, and certificate

> [!CAUTION]
> DO NOT delete the previous data because it will break certificate verification

## Dependencies

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- Relational Database e.g. MySQL

## Developers

SMCU developers by generation. Add your name here when you're continuing the legacy!

- MDCU78: Ittipat Thanabodikarn
- MDCU78: Punyawish Patumhirunruksa
