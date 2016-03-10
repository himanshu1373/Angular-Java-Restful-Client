package com.company.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

@Entity
@Table(name = "comp_owner")
//@JsonIgnoreProperties(ignoreUnknown = true) 
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Owner implements Serializable {
	public Owner()
	{
		
	}
	private static final long serialVersionUID = 13L;

	@Id
	@GeneratedValue
	@Column(name = "owner_id")
	private long ownerId;

	@Column(name = "owner_Name")
	private String ownerName;

	@Column(name = "owner_Address")
	private String ownerAddress;

        @Column(name = "owner_City")
	private String ownerCityName;
 
        @Column(name = "owner_Country")
	private String ownerCountName;


	@Column(name = "owner_Email")
	private String ownerEmail;

	@Column(name = "owner_Phone")
	private String ownerPhone;
	
	@Column(name = "comp_id")
	private long ownerCompid;
	
	public long getOwnerId() {
		return ownerId;
	}

	public void setOwnerId(long ownerId) {
		this.ownerId = ownerId;
	}

	
	public String getOwnerName() {
		return ownerName;
	}

	public void setOwnerName(String ownerName) {
		this.ownerName = ownerName;
	}

	public String getOwnerAddress() {
		return ownerAddress;
	}

	public void setOwnerAddress(String ownerAddress) {
		this.ownerAddress = ownerAddress;
	}

	public String getOwnerCityName() {
		return ownerCityName;
	}

	public void setOwnerCityName(String ownerCityName) {
		this.ownerCityName = ownerCityName;
	}

	public String getOwnerCountryName() {
		return ownerCountName;
	}

	public void setOwnerCountryName(String ownerCountryName) {
		this.ownerCountName = ownerCountryName;
	}

	public String getOwnerEmail() {
		return ownerEmail;
	}

	public void setOwnerEmail(String ownerEmail) {
		this.ownerEmail = ownerEmail;
	}

	public String getOwnerPhone() {
		return ownerPhone;
	}

	public void setOwnerPhone(String ownerPhone) {
		this.ownerPhone = ownerPhone;
	}
	public long getOwnerCompid() {
		return ownerCompid;
	}

	public void setOwnerCompid(long ownerCompid) {
		this.ownerCompid = ownerCompid;
	}

}
