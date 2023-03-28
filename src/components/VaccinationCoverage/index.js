import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'

// Write your code here
const VaccinationCoverage = props => {
  const dataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}`
    }
    return number.toString()
  }

  const {details} = props
  console.log(details)
  return (
    <div>
      <h1>Vaccination Coverage</h1>
      <BarChart width={900} height={400} data={details} margin={{top: 5}}>
        <XAxis
          dataKey="vaccineDate"
          tick={{
            stoke: 'red',
            strokeWidth: 1,
            fontSize: 16,
            fontFamily: 'Roboto',
          }}
        />
        <YAxis
          tickFormatter={dataFormatter}
          tick={{
            stoke: 'green',
            stokeWidth: 1,
            fontSize: 16,
            fontFamily: 'Roboto',
          }}
        />
        <Legend
          wrapperStyle={{
            paddingTop: 20,
            textAlign: 'center',
            fontSize: 12,
            fontFamily: 'Roboto',
          }}
        />
        <Bar
          dataKey="dose1"
          name="Dose 1"
          fill="#5a8dee"
          radius={[10, 10, 0, 0]}
          barSize="20%"
        />
        <Bar
          dataKey="dose2"
          name="Dose 2"
          fill="#f54394"
          radius={[5, 5, 0, 0]}
          barSize="20%"
        />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage
