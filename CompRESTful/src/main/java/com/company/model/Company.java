package com.company.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

@Entity
@Table(name = "company")
//@JsonIgnoreProperties(ignoreUnknown = true) 
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Company implements Serializable {
	public Company()
	{
		
	}
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "comp_id")
	private long compid;

	@Column(name = "comp_name")
	private String compName;

	@Column(name = "comp_address")
	private String compAddress;

        @Column(name = "city")
	private String cityName;
 
        @Column(name = "country")
	private String countryName;


	@Column(name = "email")
	private String email;

	@Column(name = "phone")
	private String phone;

	public long getcompId() {
		return compid;
	}

	public void setcompId(long compid) {
		this.compid = compid;
	}

	public String getCompName() {
		return compName;
	}

	public void setCompName(String compName) {
		this.compName = compName;
	}

	public String getCompAddress() {
		return compAddress;
	}

	public void setCompAddress(String compAddress) {
		this.compAddress = compAddress;
	}

	
	public String getCityName() {
		return cityName;
	}

	public void setCityName(String cityName) {
		this.cityName = cityName;
	}
	
	
	
	public String getCountryName() {
		return countryName;
	}

	public void setCountryName(String countryName) {
		this.countryName = countryName;
	}
	
	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}
}
