require('dotenv').config();
import { sql } from './sql';
import { promises as fs } from 'fs';

let getTables = `
select t.name entityName, concat(s.name, '.[' , t.name, ']') tableName 
from (
	select t.name, t.schema_id, t.object_id from sys.tables t 
	union all
	select t.name, t.schema_id, t.object_id from sys.views t 
	) as t 
join sys.schemas s on s.schema_id = t.schema_id and s.name = 'dbo'
`
let getColumns = `
select t.name entityName, c.name columnName, y.name columnType
from (
	select t.name, t.schema_id, t.object_id from sys.tables t 
	union all
	select t.name, t.schema_id, t.object_id from sys.views t 
	) as t 
join sys.schemas s on s.schema_id = t.schema_id and s.name = 'dbo'
join sys.all_columns c on c.object_id = t.object_id -- and c.name not in ('owner', 'stamp')
join sys.types y on y.system_type_id = c.system_type_id and y.name not in ('sysname')
order by entityName, c.column_id
`

async function getDbModels() {
    let { recordset: tables } = await sql(getTables);
    let { recordset: columns } = await sql(getColumns);
    let dbo = {};
    let entity = {};
    tables.forEach(t => dbo[t.entityName] = t.tableName);
    columns.forEach(c => {
        entity[c.entityName] = entity[c.entityName] || [];
        entity[c.entityName].push(`${optional(c.columnName)}: ${jsType(c.columnType)}`);
    });
    let models = `export const dbo = {\n`;
    Object.keys(dbo).forEach(key => {
        models += `\t${key}: "${dbo[key]}",\n`
    });
    models += '};\n\n';

    Object.keys(entity).forEach(key => {
        models += `export type ${key}Entity = { ${entity[key].join(', ')} }\n`
    });
    await fs.writeFile('./src/app/shared/models.ts', models);
    await fs.writeFile('./api/src/models.ts', models);
    return { dbo };
}

function jsType(sqlType: string) {
    if (~['nvarchar', 'varchar', 'nchar', 'char', 'ntext', 'text', 'uniqueidentifier'].indexOf(sqlType)) return 'string';
    if (~['numeric', 'decimal', 'bigint', 'int', 'smallint', 'tinyint', 'float', 'real', 'money', 'smallmoney'].indexOf(sqlType)) return 'number';
    if (~['datetimeoffset', 'datetime2', 'datetime', 'smalldatetime', 'date', 'time'].indexOf(sqlType)) return 'Date';
    if (~['bit'].indexOf(sqlType)) return 'boolean | number';
    throw new Error(`Unknown "${sqlType}" sqlType`)
}
function optional(key: string) {
    if (~['owner', 'stamp'].indexOf(key)) return `${key}?`;
    return key;
}

getDbModels()
    .then(console.log)
    .catch(console.error);