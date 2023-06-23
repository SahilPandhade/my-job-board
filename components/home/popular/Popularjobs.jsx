import {React,useState} from 'react'
import { View, Text ,ActivityIndicator,FlatList, TouchableOpacity } from 'react-native'
import { useRouter } from "expo-router";
import styles from './popularjobs.style'
import {PopularJobCard} from '../../../components'
import { COLORS, SIZES } from '../../../constants'
import useFetch from '../../../hooks/useFetch'
const Popularjobs = () => {
  const router = useRouter()
  const {data,isLoading,error} = useFetch("search",{
    query:'React developer',
    num_pages: 1
  })
  const [selectedJob,setSelectedJob] = useState()
  const handleCardPress = (item)=>{
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  }
  // console.log(data)
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <TouchableOpacity onPress={()=>{}}>
          <Text style={styles.headerBtn}>See all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
      {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : 
        error ? (
          <Text>Something went wrong</Text>
        ) : 
        (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
                selectedJob={selectedJob}
                handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={(item) => item.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  )
}

export default Popularjobs