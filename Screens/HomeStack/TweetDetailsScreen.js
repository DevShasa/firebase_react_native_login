import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView, Text } from "react-native";
import TweetContent from "../../Components/TweetContent";
import { useLayoutEffect } from "react";

export default function TweetDetailScreen(){
    const router = useRoute();
    const navigation = useNavigation();
    const {params} = router;

    useLayoutEffect(()=>{
        // runs before we show anything to the user
        navigation.setOptions({
            headerTitle: params.tweet.author.name
        })
    },[])

    return(
        <SafeAreaView>
            {/* <Text>
                Tweet Details
            </Text> */}
            <TweetContent tweet={params.tweet}/>
        </SafeAreaView>
    )
}