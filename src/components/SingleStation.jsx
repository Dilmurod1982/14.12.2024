import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useAppStore } from "./zustand";

function SingleStation() {
  const { id } = useParams();
  const [station, setStation] = useState(null);
  const rol = useAppStore((state) => state.rol);

  useEffect(() => {
    const fetchStation = async () => {
      const stationRef = doc(db, "stations", id);
      const stationSnap = await getDoc(stationRef);
      if (stationSnap.exists()) {
        setStation(stationSnap.data());
      } else {
        console.log("No such document!");
      }
    };
    fetchStation();
  }, [id]);
  console.log(station);
  if (!station) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-center  w-full gap-2">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-3xl">{station.moljal}</CardTitle>
            <CardDescription>
              {station.ltd} №{station.station_number}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Директор/бошқарувчи</Label>
                <h1 className="text-2xl">{station.boshqaruvchi}</h1>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Телефони</Label>
                <h1 className="text-2xl">{station.aloqa_tel}</h1>
              </div>
              {rol === "admin" && (
                <div>
                  <Label htmlFor="framework">
                    Бириктирилган фойдаланувчилар
                  </Label>
                  <ul className="text-2xl list-disc ml-5">
                    {station.operators.map((operator, index) => (
                      <li key={index}>{operator}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-3xl">Манзили</CardTitle>
            <CardDescription>Шахобча жойлашган манзили</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Вилоят</Label>
                <h1 className="text-2xl">{station.viloyat}</h1>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Туман/шаҳар</Label>
                <h1 className="text-2xl">{station.tuman}</h1>
              </div>
            </div>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Кўча</Label>
                <h1 className="text-2xl">{station.kocha}</h1>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Уй рақами</Label>
                <h1 className="text-2xl">{station.uy}</h1>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-3xl">Механик ва газ корхонаси</CardTitle>
            <CardDescription>
              Механиклар телефони ва газ билан таъминловчи корхона
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Бош механик</Label>
                <h1 className="text-2xl">{station.bosh_mexanik}</h1>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Бош механик уяли телефони</Label>
                <h1 className="text-2xl">{station.b_mexanik_tel}</h1>
              </div>
            </div>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">
                  Механиклар хонасидаги телефон рақами
                </Label>
                <h1 className="text-2xl">{station.mexanik_tel}</h1>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Газ билан таъминловчи корхона</Label>
                <h1 className="text-2xl">{station.gaz_taminot}</h1>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-center">
        <Link to="/stations">Орқага</Link>
      </div>
    </div>
  );
}

export default SingleStation;
