import { Flex, SimpleGrid, Box, Text, theme} from "@chakra-ui/react";
import React from "react";
import { Header } from "../components/Header";
import Sidebar from "../components/Sidebar";

import dynamic from "next/dynamic"

const Chart = dynamic(() => import('react-apexcharts'), {ssr: false})


const options = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: "datetime" as "datetime",
    axisBorder: {
      color: theme.colors.gray[500]
    },
    axisTicks: {
      color: theme.colors.gray[500]
    },
    categories: [
      '2021-12-01T00:00:00.00Z',
      '2021-12-02T00:00:00.00Z',
      '2021-12-03T00:00:00.00Z',
      '2021-12-04T00:00:00.00Z',
      '2021-12-05T00:00:00.00Z',
      '2021-12-06T00:00:00.00Z',
      '2021-12-07T00:00:00.00Z',
    ]
  },
  fill: {
    opacity: .3,
    type: "gradient" as "gradient",
    gradient: {
      shade: "dark",
      opacityFrom: .7,
      opacityTo: .3
    }
  }
}
const series = [
  {name: "series1", data: [31, 120, 10, 28, 51, 18, 109]}
]

export default function Dashboard() {

  return (
    <Flex 
      direction="column"
      h="100vh"
    >
      <Header/>

      <Flex
        w="100%"
        my="6"
        px="6"
        mx="auto"
        maxWidth={1400}
      >
        <Sidebar/>

        <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
          <Box p="8" pb="4"  bg="gray.800" borderRadius="8" >
            <Text fontSize="lg" mb="4">Inscritos da semana</Text>
            <Chart options={options} series={series} type="area" height={180}/>
          </Box>
          <Box p="8" bg="gray.800" borderRadius="8">
            <Text fontSize="lg" mb="4">Taxa de abertura</Text>
            <Chart options={options} series={series} type="area" height={180}/>
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  )
}