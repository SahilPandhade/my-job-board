import React from 'react'
import { View,Text,SafeAreaView,ScrollView,RefreshControl,ActivityIndicator } from 'react-native';
import {useRouter,Stack,useSearchParams} from 'expo-router';
import { useState,useCallback } from 'react';
import {JobAbout,JobFooter,Company,ScreenHeaderBtn,Specifics} from '../../components'
import useFetch from '../../hooks/useFetch';
import { COLORS, SIZES, icons } from '../../constants';
import {default as JobTabs} from '../../components/jobdetails/tabs/Tabs'
const tabs = ["About","Qualifications","Responsibilities"];
const JobDetails = () => {
    const params = useSearchParams();
    const router = useRouter();
    const [refreshing,setRefreshing] = useState(false);
    const [activeTab,setActiveTab] = useState(tabs[0]);

    const {data,isLoading,error,refetch} = useFetch('job-details',{
        job_id:params.id
    })

    const onRefresh = ()=>{
        
    }

    const displayTabContent = ()=>{
        switch(activeTab){
            case "About":
                return <JobAbout info={data[0].job_description ?? 'No data provided'}/>
            case "Qualifications":
                return <Specifics title="Qualifications" points={data[0].job_highlights?.Qualifications ?? ['N/A']}/>
            case "Responsibilities":
                return <Specifics title="Responsibilities" points={data[0].job_highlights?.Responsibilities ?? ['N/A']}/>
            default:
                break

        }
    }
  return (
    <SafeAreaView style={{flex:1,backgroundColor:COLORS.lightWhite}}>
        <Stack.Screen
        options={{
            headerStyle:{backgroundColor:COLORS.lightWhite},
            headerShadowVisible:false,
            headerBackVisible:false,
            headerLeft:()=>{
                <ScreenHeaderBtn iconsUrl={icons.left} dimensions="60%" handlePress={()=>router.back()}/>
            },
            headerRight:()=>{
                <ScreenHeaderBtn iconsUrl={icons.share} dimensions="60%" handlePress={()=>router.back()}/>
            },
            headerTitle:'',
        }}></Stack.Screen>

        <>
            <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                    {
                        isLoading ? (
                            <ActivityIndicator size="large" color={COLORS.primary}/>
                        ) : error ? (
                            <Text>Something went wrong !</Text>
                        ) : (
                            data.length===0 ?(
                                <Text>No data to show</Text>
                            ) :(
                                <View style={{padding:SIZES.medium,paddingBottom:100}}>
                                    <Company
                                        companyLogo={data[0].employer_logo}
                                        jobTitle={data[0].job_title}
                                        companyName={data[0].employer_name}
                                        Location={data[0].job_country}    
                                    />

                                    <JobTabs
                                        tabs = {tabs}
                                        activeTab = {activeTab}
                                        setActiveTab = {setActiveTab}
                                    />

                                    {displayTabContent()}
                                </View>
                            )
                        )
                        
                    }
            </ScrollView>

            <JobFooter url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results'}/>
        </>
    </SafeAreaView>
  )
}

export default JobDetails