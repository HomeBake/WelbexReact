const pool = require('./db.js')

const fillDB = async () => {
    const isFilled = await pool.query(`
        SELECT "ID" FROM public.table
        `)
    !isFilled.rowCount &&
    pool.query(`
        INSERT INTO public."table" ("DATE", "TITLE", "AMOUNT", "DISTANCE") 
        VALUES ('2002.07.01'::date, 'Автомобиль'::character varying, '15000'::bigint, '15.5'::numeric);
        INSERT INTO public."table" ("DATE", "TITLE", "AMOUNT", "DISTANCE") 
        VALUES ('2021.12.22'::date, 'Кофемашина'::character varying, '100'::bigint, '15222.5'::numeric);
        INSERT INTO public."table" ("DATE", "TITLE", "AMOUNT", "DISTANCE") 
        VALUES ('1999.03.30'::date, 'Гараж'::character varying, '123100'::bigint, '1525'::numeric);
        INSERT INTO public."table" ("DATE", "TITLE", "AMOUNT", "DISTANCE") 
        VALUES ('2032.02.13'::date, 'Стелька'::character varying, '143200'::bigint, '215222.5'::numeric);
        INSERT INTO public."table" ("DATE", "TITLE", "AMOUNT", "DISTANCE") 
        VALUES ('1002.04.14'::date, 'Бутылка'::character varying, '176500'::bigint, '315222.5'::numeric);
        INSERT INTO public."table" ("DATE", "TITLE", "AMOUNT", "DISTANCE") 
        VALUES ('1982.05.11'::date, 'Кружка'::character varying, '1050'::bigint, '615222.54'::numeric);
        INSERT INTO public."table" ("DATE", "TITLE", "AMOUNT", "DISTANCE") 
        VALUES ('1992.02.12'::date, 'Монитор'::character varying, '10'::bigint, '315222.35'::numeric);
        INSERT INTO public."table" ("DATE", "TITLE", "AMOUNT", "DISTANCE") 
        VALUES ('2012.01.23'::date, 'Чайник'::character varying, '1'::bigint, '415222.56'::numeric);
        INSERT INTO public."table" ("DATE", "TITLE", "AMOUNT", "DISTANCE") 
        VALUES ('2013.09.22'::date, 'Клавиатура'::character varying, '140'::bigint, '4515222.45'::numeric);
        INSERT INTO public."table" ("DATE", "TITLE", "AMOUNT", "DISTANCE") 
        VALUES ('2014.06.23'::date, 'Небо'::character varying, '106564'::bigint, '1'::numeric);
        INSERT INTO public."table" ("DATE", "TITLE", "AMOUNT", "DISTANCE") 
        VALUES ('2017.05.24'::date, 'Солнце'::character varying, '145645600'::bigint, '3'::numeric);
        INSERT INTO public."table" ("DATE", "TITLE", "AMOUNT", "DISTANCE") 
        VALUES ('2015.06.25'::date, 'Зима'::character varying, '10045'::bigint, '123'::numeric);
        INSERT INTO public."table" ("DATE", "TITLE", "AMOUNT", "DISTANCE") 
        VALUES ('2019.07.21'::date, 'Пельмешки'::character varying, '1060'::bigint, '3432.5'::numeric);
        INSERT INTO public."table" ("DATE", "TITLE", "AMOUNT", "DISTANCE") 
        VALUES ('2014.03.26'::date, 'Печеньки'::character varying, '14400'::bigint, '232.5'::numeric);
        `)
    
}
module.exports =  function initDB() {
    pool.query(`CREATE TABLE IF NOT EXISTS public."table"
(
    "ID" serial,
    "DATE" date,
    "TITLE" character varying,
    "AMOUNT" bigint,
    "DISTANCE" numeric,
    CONSTRAINT table_pkey PRIMARY KEY ("ID")
);
`,
        (error,results) => {
        error ? console.log(error)
            :
            fillDB()
        })
}