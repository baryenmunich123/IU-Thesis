import React from 'react';
import { Page, Text, Image, Document, StyleSheet, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 12,
        textAlign: "left",
        fontFamily: "Times-Roman",
    },
    text: {
        margin: 5,
        fontSize: 14,
        textAlign: "justify",
        fontFamily: "Times-Roman",
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: "center",
        color: "grey",
    },
    pageNumber: {
        position: "absolute",
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "grey",
    },
});

const PDFFile = ({ dataReplaced }) => {
    // console.log(dataReplaced.Khóa)
    // var result = Object.keys(dataReplaced).map((key) => [dataReplaced[key]]);
    // console.log(result)
    return (
        <Document>
            <Page size="A4" style={styles.body}>
                <Text style={styles.title}>DAI HOC QUOC GIA                                                     CONG HOA XA HOI CHU NGHIA VIET NAM </Text>
                <Text style={styles.title}>THANH PHO HO CHI MINH                                                          Doc lap - Tu do - Hanh Phuc</Text>
                <Text style={styles.title}>TRUONG DAI HOC QUOC TE</Text>
                <Text style={styles.title}>So: 2575/GCN-DHQT                                                   Thanh pho Ho Chi Minh, ngay 19 thang 3 nam 2022</Text>
                <Text style={[styles.title, { textAlign: "center", marginTop: "30", fontSize: '20' }]}>GIAY CHUNG NHAN SINH VIEN</Text>
                <Text style={styles.text}>Truong Dai Hoc Quoc Te thuoc Dai Hoc Quoc Gia chung nhan:</Text>
                <Text style={styles.text}>Sinh vien: Nguyen Thanh Phong</Text>
                <Text style={styles.text}>MSSV: ITITIU19040</Text>
                <Text style={styles.text}>Ngay, Thang, Nam sinh: 18/09/2001</Text>
                <Text style={styles.text}>Noi sinh: Thanh pho Ho Chi Minh</Text>
                <Text style={styles.text}>Khoa: 2019-2023</Text>
                <Text style={styles.text}>Khoa: Cong Nghe Thong Tin</Text>
                <Text style={styles.text}>Hinh thuc dao tao: He chinh quy</Text>
                <Text style={styles.text}>Thoi gian hoc toi da theo quy che hoc vu hien hanh: 9/2025</Text>
                <Text style={styles.text}>Giay chung nhan nay duoc cap cho duong su de: Bo sung ho so xin hoan nghia vu quan su</Text>
                <Text style={styles.text}>Tran trong.</Text>
                <Text style={[styles.text, { marginTop: "30" }]}>Noi nhan                                                                             TL.HIEU TRUONG</Text>
                <Text style={styles.text}>- Sinh vien: Nguyen Thanh Phong              TRUONG PHONG HANH CHINH TONG HOP</Text>
                <Text style={styles.text}>- Dia phuong noi cu tru</Text>
                <Text style={styles.text}>- Luu: VT</Text>
                <Text
                    style={styles.pageNumber}
                    render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
                    fixed />
            </Page>
        </Document >
    )
}

export default PDFFile