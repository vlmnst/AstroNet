import React from "react";
import { useDispatch} from "react-redux";
import { Text, View, TextInput, Button, StyleSheet, SafeAreaView, StatusBar,TouchableOpacity  } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { createUser } from "../../Redux/Slice/userSlice";
// username:           { type: String, required: true, unique: true },
// email:              { type: String, required: true, unique: true },
// role:               { type: String, required: true, unique: false },       // role (admin/user/banned)
// passwordHash:       { type: String, required: true },
// dni:                { type: Number, required: true },
// firstname:          { type: String, required: true },
// lastname:           { type: String, required: true },
// birthday:           { type: String, required: true },
// phone:              { type: String, required: true },
// location:           { type: Object, required: true },       // country {country: , city: , state: }
// address:            { type: Object, required: true },       // address {street address: , floor: , department: , zip code: }

const UserCreate = ({ navigation }) => {

  const dispatch = useDispatch();

  const { control, handleSubmit, formState: { errors } } = useForm({
      defaultValues: {
        username: '',
        email: '',
        password: '',
        dni: 0,
        firstname: '',
        lastname: '',
        birthday: '',
        phone: '',
        country:"" ,
        city:"" ,
        state:"",
        street_address:"",
        floor:"",
        department:"",
        zip_code:"" 
      }
  });

    const onSubmit = data => {
          const user = {
            username: data.username,
            email: data.email,
            password: data.password,
            dni: data.dni,
            firstname: data.firstname,
            lastname: data.lastname,
            birthday: data.birthday,
            phone: data.phone,
            location: {"country":data.country,"city":data.country,"state":data.state},
            address: {"street_address":data.street_address , "floor":data.floor , "department":data.department , "zip_code":data.zip_code }
          }
          dispatch(createUser(user));
          navigation.navigate('Login')
    };
      
    const Separator = () => (
        <View style={styles.separator} />
    );

    return(
        <View>
        <SafeAreaView style={styles.AndroidSafeArea} >

        <Text style={styles.TitleText}>Username:</Text>
        <Controller
          control={control}
          rules={{
           required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="username"
        />
        {errors.username && <Text style={styles.ErrorText}>Insert username</Text>}

        <Text style={styles.TitleText}>Password:</Text>  
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="password"
        />
        {errors.password && <Text style={styles.ErrorText}>Insert password</Text>}

        <Text style={styles.TitleText}>Email:</Text>  
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="email"
        />
        {errors.email && <Text style={styles.ErrorText}>Insert email </Text>}

        <Text style={styles.TitleText}>Firstname:</Text>            
        <Controller
          control={control}
          rules={{
           required: true,
           min: 1,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="firstname"
        />
        {errors.firstname && <Text style={styles.ErrorText}>Insert Firstname</Text>}

        <Text style={styles.TitleText}>Lastname:</Text>  
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="lastname"
        />
        {errors.lastname && <Text style={styles.ErrorText}>Insert lastname</Text>}

        <Text style={styles.TitleText}>Dni:</Text>  
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="dni"
        />
        {errors.dni && <Text style={styles.ErrorText}>Insert Dni</Text>}

        <Text style={styles.TitleText}>birthday:</Text>  
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="birthday"
        />
        {errors.birthday && <Text style={styles.ErrorText}>Insert Birthday</Text>}

        <Text style={styles.TitleText}>phone:</Text>  
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="phone"
        />
        {errors.phone && <Text style={styles.ErrorText}>Insert Phone</Text>}
        <Text style={styles.TitleText}>Location</Text>
        <View style={styles.Container_}>
        <Text>Country:</Text>  
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="country"
        />
        {errors.country && <Text style={styles.ErrorText}>Insert Country</Text>}
        <Text>City:</Text>  
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="city"
        />
        {errors.city && <Text style={styles.ErrorText}>Insert city</Text>} 

        <Text>State:</Text>  
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="state"
        />
        {errors.state && <Text style={styles.ErrorText}>Insert state</Text>} 
        </View>
        <Text style={styles.TitleText}>Address</Text>
        <View style={styles.Container_}>
        <Text>Street address:</Text>  
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="street_address"
        />
        {errors.street_address && <Text style={styles.ErrorText}>Insert street address</Text>} 
        
        <Text>floor:</Text>  
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="floor"
        />
        {errors.floor && <Text style={styles.ErrorText}>Insert floor</Text>} 

        <Text>Department:</Text>  
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="department"
        />
        {errors.department && <Text style={styles.ErrorText}>Insert department</Text>} 

        <Text >Zip code:</Text>  
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="zip_code"
        />
        {errors.zip_code && <Text style={styles.ErrorText}>Insert Zip code</Text>} 
        </View>
        <Separator/>
        <TouchableOpacity style={styles.Bottunn_} onPress={handleSubmit(onSubmit)}>
          <Text>Register</Text>
        </TouchableOpacity>

        {/* <Button style={styles.Bottunn_} title="Register" onPress={handleSubmit(onSubmit)} /> */}

      </SafeAreaView>
      </View>
    ); 
};


const styles = StyleSheet.create({
  AndroidSafeArea: { paddingTop: StatusBar.currentHeight + 10 ,alignItems : 'center'},
  container:{flex: 1, justifyContent: 'center', marginHorizontal: 16, backgroundColor: '#5E5E5E'},
  input: { borderWidth: 1,borderRadius: 8,borderColor: "#A09E9E",backgroundColor: '#FFFFFF', marginTop: 0, marginHorizontal: 10, padding: 5, width: '25%' },
  inputmul: { backgroundColor: '#FFFFFF', marginTop: 10, marginHorizontal: 10, padding: 5, height: 100, width: '100%' },
  title: { fontSize: 20, padding: 5, marginLeft: 10 },
  separator: { marginVertical: 8, borderBottomColor: '#737373', borderBottomWidth: StyleSheet.hairlineWidth },
  Container_: { flexDirection: "row", marginBottom: 1, boderWidth: 2, borderColor: "#ccc", marginHorizontal: 15 },
  ContainerFather:{},
  TitleText:{textAlign:"center",fontSize:18,width: '25%'},
  ErrorText:{textAlign:"center",fontSize:18, backgroundColor:"red",width: '150px',borderRadius: 30,paddingLeft:10,paddingRight:10,marginLeft:15,marginRight:15},
  Bottunn_:{backgroundColor:"#ccc",padding: 10,borderRadius: 12}
});

export default UserCreate;