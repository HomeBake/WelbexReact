const pool = require('./db.js')

const fillDB = async () => {
    const isFilled = await pool.query(`
        SELECT "ID" FROM public.table
        `)
    !isFilled.rowCount &&
    pool.query(`
        INSERT INTO public."table" ("DATE", "TITLE", "AMOUNT", "DISTANCE") 
        VALUES ('2022.07.12'::date, 'Автомобиль'::character varying, '15000'::bigint, '15.5'::numeric);
        INSERT INTO public."table" ("DATE", "TITLE", "AMOUNT", "DISTANCE") 
        VALUES ('2022.02.12'::date, 'Кофемашина'::character varying, '100'::bigint, '15222.5'::numeric)
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