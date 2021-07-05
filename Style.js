import { Dimensions} from "react-native";

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;

export default {
    container:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerForm:{
        alignItems: 'center',
    },
    progressBar:{
      alignItems: 'center',
      justifyContent: 'center',
    },
    input : {
        borderColor: 'gray',
        borderWidth:1 ,
        marginHorizontal : 5
    },
    worksite : {
        backgroundColor : '#FFFFFF',
        borderWidth: 1,
        borderBottomColor : '#202340',
        marginHorizontal : 5,
        paddingHorizontal : 20,
        paddingVertical : 10,
        flex : 1,
        flexDirection : 'row',
        justifyContent : 'space-between',
    },

    semaines : {
        backgroundColor : '#FFFFFF',
        borderWidth: 1,
        borderBottomColor : '#202340',
        marginHorizontal : 5,
        paddingHorizontal : 20,
        paddingVertical : 10,
        flex : 1,
        flexDirection : 'column',
        justifyContent : 'space-between',
    },

    jours: {
        marginVertical : 2,
        fontSize: 15,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },

    previewPlace : {
        borderWidth:1,
        backgroundColor : '#FFFFFF',
        borderColor : '#aaa5a5',
        height : 50,
        marginHorizontal : 15,
        flexDirection : 'row',
        alignItems: 'center',
    },
    rightWorksite : {
        color : '#FFF',
        fontWeight : 'bold',
        fontSize : 22
    },
    button : {
        width: '40%',
        height : 40,
        paddingHorizontal : 4,
        flex :1
    },
    buttonIcon : {
        height : 50,
        paddingHorizontal : 4,
        flex : 1
    },
    littleButton : {
        width: '10%',
        height : 40
    },
    containerlist:{
        flex : 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal : 60,
        backgroundColor : 'rgba(252,164,0,0.22)'
    },
    title : {
        fontWeight: 'bold',
        fontSize: 30,
        paddingTop : 20
    },
    formInput : {
        height : 40 ,
        padding : 10,
        borderColor: 'gray',
        borderWidth:1
    },
    getStartedText: {
        marginVertical : 40,
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
        justifyContent : 'center'
    },

    previewText: {
        flex : 2,
        paddingVertical : 50,
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
        justifyContent : 'center'
    },
    textinput : {
        alignSelf: 'stretch',
        height: 40,
        color: "black",
        backgroundColor: '#ffffff',
        borderWidth : 1,
        borderColor : '#abb0b0',
        marginHorizontal : 15,
        marginBottom: 15,
    },

    cardFuel: {
        flexDirection : "row",
        position : "absolute",
        backgroundColor: "#FFF",
        borderRadius : 5,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        bottom: 200,
        left: width*0.14,
        right: 0,
        height: CARD_HEIGHT*1.9,
        width: CARD_WIDTH*0.85,
        overflow: "hidden",
    },

    // Marker Custom
    bubble : {
        flexDirection : 'column',
        alignSelf: "flex-start",
        backgroundColor : '#fff',
        borderColor: "#cccccc",
        width: 150,
    },

    arrow: {
        backgroundColor: "transparent",
        borderColor : "transparent",
        borderTopColor : "#fff",
        borderWidth: 16,
        alignSelf: 'center',
        marginTop : -32,
    },

    arrowBorder: {
        backgroundColor: "transparent",
        borderColor : "transparent",
        borderTopColor : "#007a87",
        borderWidth: 16,
        alignSelf: 'center',
        marginTop : -0.5,
    },

    name : {
        fontSize: 16,
        marginBottom: 5,
    },

    card: {
        flexDirection : "row",
        position : "absolute",
        backgroundColor: "#FFF",
        borderRadius : 5,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        bottom: 5,
        left: width*0.07,
        right: 0,
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
    },
    timePicker : {
        flexDirection : "column",
        width: CARD_WIDTH*0.66,

    },
    textContent: {
        flex: 2,
        padding: 10,
    },
    cardTitle: {
        fontSize: 12,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        paddingVertical:5,
        color: "#444",
    },
}
